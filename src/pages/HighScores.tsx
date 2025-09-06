import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, ArrowLeft, Trash2 } from "lucide-react";

interface HighScore {
  id: string;
  score: number;
  percentage: number;
  totalQuestions: number;
  category: string;
  difficulty: string;
  timestamp: string;
}

const HighScores = () => {
  const [highScores, setHighScores] = useState<HighScore[]>([]);

  useEffect(() => {
    loadHighScores();
  }, []);

  const loadHighScores = () => {
    const saved = localStorage.getItem('quizHighScores');
    if (saved) {
      const scores = JSON.parse(saved);
      setHighScores(scores.sort((a: HighScore, b: HighScore) => b.score - a.score));
    }
  };

  const clearHighScores = () => {
    localStorage.removeItem('quizHighScores');
    setHighScores([]);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success text-success-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">High Scores</h1>
              <p className="text-muted-foreground">Your best quiz performances</p>
            </div>
          </div>

          <Card className="animate-scale-in">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Leaderboard
              </CardTitle>
              
              {highScores.length > 0 && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={clearHighScores}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              )}
            </CardHeader>
            
            <CardContent>
              {highScores.length === 0 ? (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No high scores yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Complete a quiz to see your scores here!
                  </p>
                  <Link to="/setup">
                    <Button>Start Your First Quiz</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {highScores.map((score, index) => (
                    <div
                      key={score.id}
                      className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      {/* Rank */}
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-yellow-500 text-white' :
                          index === 1 ? 'bg-gray-400 text-white' :
                          index === 2 ? 'bg-amber-600 text-white' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {index + 1}
                        </div>
                      </div>

                      {/* Score Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-lg">
                            {score.score} pts
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({score.percentage}%)
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{score.totalQuestions} questions</span>
                          <span>•</span>
                          <span className="truncate">{score.category}</span>
                        </div>
                      </div>

                      {/* Badges and Date */}
                      <div className="flex-shrink-0 text-right">
                        <Badge className={`mb-2 ${getDifficultyColor(score.difficulty)}`}>
                          {score.difficulty}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(score.timestamp)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Call to Action */}
          {highScores.length > 0 && (
            <div className="text-center mt-8">
              <Link to="/setup">
                <Button className="gradient-primary">
                  Try to Beat Your Record!
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HighScores;