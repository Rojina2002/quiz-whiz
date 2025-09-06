import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, RotateCcw, Home, Share2, Check, X } from "lucide-react";
import { Question, QuizSettings } from "@/services/triviaApi";

interface QuizResults {
  score: number;
  totalQuestions: number;
  answers: (number | null)[];
  questions: Question[];
  settings: QuizSettings;
}

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<QuizResults | null>(null);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const savedResults = localStorage.getItem('quizResults');
    if (!savedResults) {
      navigate('/');
      return;
    }

    setResults(JSON.parse(savedResults));
  }, [navigate]);

  const handlePlayAgain = () => {
    localStorage.removeItem('quizResults');
    navigate('/quiz');
  };

  const handleNewQuiz = () => {
    localStorage.removeItem('quizResults');
    navigate('/setup');
  };

  const handleShare = async () => {
    const shareText = `I just scored ${results?.score} points on QuizWhiz! Can you beat my score?`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'QuizWhiz Score',
          text: shareText,
          url: window.location.origin
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(`${shareText} ${window.location.origin}`);
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(`${shareText} ${window.location.origin}`);
    }
  };

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  const correctAnswers = results.answers.filter((answer, index) => 
    answer === results.questions[index]?.correctIndex
  ).length;

  const percentage = Math.round((correctAnswers / results.totalQuestions) * 100);
  
  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-success";
    if (percentage >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return "Outstanding! 🏆";
    if (percentage >= 80) return "Excellent work! 🎉";
    if (percentage >= 70) return "Great job! 👏";
    if (percentage >= 60) return "Good effort! 👍";
    if (percentage >= 50) return "Not bad! 📚";
    return "Keep practicing! 💪";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-16 h-16 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
            <p className="text-muted-foreground">{getScoreMessage(percentage)}</p>
          </div>

          {/* Score Summary */}
          <Card className="mb-8 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-center">Your Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className={`text-3xl font-bold ${getScoreColor(percentage)}`}>
                    {percentage}%
                  </div>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                </div>
                
                <div>
                  <div className="text-3xl font-bold text-foreground">
                    {correctAnswers}/{results.totalQuestions}
                  </div>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                
                <div>
                  <div className="text-3xl font-bold text-foreground">
                    {results.score}
                  </div>
                  <p className="text-sm text-muted-foreground">Points</p>
                </div>
                
                <div>
                  <Badge variant="secondary" className="text-sm">
                    {results.settings.difficulty}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">Difficulty</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button onClick={handlePlayAgain} className="gradient-primary">
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
            
            <Button onClick={handleNewQuiz} variant="outline">
              New Quiz
            </Button>
            
            <Button onClick={handleShare} variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Share Score
            </Button>
            
            <Link to="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>

          {/* Review Toggle */}
          <div className="text-center mb-6">
            <Button
              variant="ghost"
              onClick={() => setShowReview(!showReview)}
              className="text-primary hover:text-primary-hover"
            >
              {showReview ? "Hide" : "Review"} Answers
            </Button>
          </div>

          {/* Answer Review */}
          {showReview && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-xl font-semibold mb-4">Answer Review</h3>
              
              {results.questions.map((question, index) => {
                const userAnswer = results.answers[index];
                const isCorrect = userAnswer === question.correctIndex;
                
                return (
                  <Card key={question.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isCorrect ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'
                        }`}>
                          {isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              Question {index + 1}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {question.difficulty}
                            </Badge>
                          </div>
                          
                          <h4 className="font-medium mb-3">{question.question}</h4>
                          
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">Your answer:</span>
                              <span className={userAnswer !== null ? (isCorrect ? 'text-success' : 'text-destructive') : 'text-muted-foreground'}>
                                {userAnswer !== null ? question.options[userAnswer] : 'No answer'}
                              </span>
                            </div>
                            
                            {!isCorrect && (
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Correct answer:</span>
                                <span className="text-success">
                                  {question.options[question.correctIndex]}
                                </span>
                              </div>
                            )}
                            
                            {question.explanation && (
                              <div className="mt-3 p-3 bg-muted rounded-lg">
                                <p className="text-muted-foreground text-xs italic">
                                  {question.explanation}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;