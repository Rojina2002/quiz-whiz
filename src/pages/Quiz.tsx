import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight, Home } from "lucide-react";
import { fetchQuestions, Question, QuizSettings } from "@/services/triviaApi";
import { Link } from "react-router-dom";

interface QuizState {
  questions: Question[];
  currentIndex: number;
  score: number;
  answers: (number | null)[];
  timeLeft: number;
  isAnswered: boolean;
  showFeedback: boolean;
}

const Quiz = () => {
  const navigate = useNavigate();
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentIndex: 0,
    score: 0,
    answers: [],
    timeLeft: 15,
    isAnswered: false,
    showFeedback: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<QuizSettings | null>(null);

  // Load quiz data on component mount
  useEffect(() => {
    const loadQuiz = async () => {
      const savedSettings = localStorage.getItem('quizSettings');
      if (!savedSettings) {
        navigate('/setup');
        return;
      }

      const quizSettings = JSON.parse(savedSettings) as QuizSettings;
      setSettings(quizSettings);

      try {
        const questions = await fetchQuestions(quizSettings);
        setQuizState(prev => ({
          ...prev,
          questions,
          answers: new Array(questions.length).fill(null),
          timeLeft: parseInt(quizSettings.timePerQuestion)
        }));
      } catch (error) {
        console.error('Failed to load questions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuiz();
  }, [navigate]);

  // Timer effect
  useEffect(() => {
    if (isLoading || quizState.isAnswered || quizState.showFeedback) return;

    const timer = setInterval(() => {
      setQuizState(prev => {
        if (prev.timeLeft <= 1) {
          // Time's up - mark as incorrect and show feedback
          return {
            ...prev,
            timeLeft: 0,
            isAnswered: true,
            showFeedback: true
          };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState.currentIndex, quizState.isAnswered, quizState.showFeedback, isLoading]);

  const handleAnswerSelect = useCallback((optionIndex: number) => {
    if (quizState.isAnswered || quizState.showFeedback) return;

    const currentQuestion = quizState.questions[quizState.currentIndex];
    const isCorrect = optionIndex === currentQuestion.correctIndex;
    
    setQuizState(prev => ({
      ...prev,
      isAnswered: true,
      showFeedback: true,
      score: isCorrect ? prev.score + 10 + prev.timeLeft : prev.score, // Time bonus
      answers: prev.answers.map((answer, i) => 
        i === prev.currentIndex ? optionIndex : answer
      )
    }));
  }, [quizState.isAnswered, quizState.showFeedback, quizState.questions, quizState.currentIndex]);

  const handleNextQuestion = useCallback(() => {
    if (quizState.currentIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        timeLeft: settings ? parseInt(settings.timePerQuestion) : 15,
        isAnswered: false,
        showFeedback: false
      }));
    } else {
      // Quiz finished - save results and navigate
      const results = {
        score: quizState.score,
        totalQuestions: quizState.questions.length,
        answers: quizState.answers,
        questions: quizState.questions,
        settings
      };
      localStorage.setItem('quizResults', JSON.stringify(results));
      navigate('/results');
    }
  }, [quizState.currentIndex, quizState.questions.length, quizState.score, quizState.answers, settings, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your quiz...</p>
        </div>
      </div>
    );
  }

  if (quizState.questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h2 className="text-xl font-semibold mb-4">No Questions Available</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't load questions for your quiz. Please try again.
          </p>
          <Link to="/setup">
            <Button>Back to Setup</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const currentQuestion = quizState.questions[quizState.currentIndex];
  const progress = ((quizState.currentIndex + 1) / quizState.questions.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
          </Link>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              Score: {quizState.score}
            </Badge>
            
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4" />
              <span className={quizState.timeLeft <= 5 ? "text-destructive font-bold" : ""}>
                {quizState.timeLeft}s
              </span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {quizState.currentIndex + 1} of {quizState.questions.length}</span>
            <span>{currentQuestion.difficulty} • {currentQuestion.category}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="max-w-3xl mx-auto animate-scale-in">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-8 text-center leading-relaxed">
              {currentQuestion.question}
            </h2>
            
            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => {
                let buttonVariant: "outline" | "default" | "destructive" | "secondary" = "outline";
                let extraClasses = "text-left justify-start h-auto py-4 px-6 transition-all duration-300";
                
                if (quizState.showFeedback) {
                  if (index === currentQuestion.correctIndex) {
                    buttonVariant = "default";
                    extraClasses += " bg-success hover:bg-success border-success text-success-foreground";
                  } else if (quizState.answers[quizState.currentIndex] === index) {
                    buttonVariant = "destructive";
                    extraClasses += " bg-destructive hover:bg-destructive";
                  }
                } else {
                  extraClasses += " hover:bg-primary/5 hover:border-primary";
                }

                return (
                  <Button
                    key={index}
                    variant={buttonVariant}
                    className={extraClasses}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={quizState.isAnswered}
                  >
                    <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium mr-3">
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </Button>
                );
              })}
            </div>

            {quizState.showFeedback && (
              <div className="mt-6 text-center animate-fade-in">
                <div className="mb-4">
                  {quizState.answers[quizState.currentIndex] === currentQuestion.correctIndex ? (
                    <p className="text-success font-medium">Correct! +{10 + quizState.timeLeft} points</p>
                  ) : (
                    <p className="text-destructive font-medium">
                      {quizState.timeLeft === 0 ? "Time's up!" : "Incorrect!"}
                    </p>
                  )}
                </div>
                
                {currentQuestion.explanation && (
                  <p className="text-sm text-muted-foreground mb-4 italic">
                    {currentQuestion.explanation}
                  </p>
                )}
                
                <Button onClick={handleNextQuestion} className="gradient-primary">
                  {quizState.currentIndex < quizState.questions.length - 1 ? (
                    <>
                      Next Question
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    "View Results"
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;