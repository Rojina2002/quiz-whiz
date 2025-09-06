import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, PlayCircle, Clock, Trophy, Keyboard } from "lucide-react";

const HowToPlay = () => {
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
              <h1 className="text-3xl font-bold">How to Play</h1>
              <p className="text-muted-foreground">Everything you need to know about QuizWhiz</p>
            </div>
          </div>

          <div className="grid gap-6">
            {/* Getting Started */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-primary" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">1. Choose Your Settings</h4>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred category, difficulty level, number of questions, and time per question.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">2. Answer Questions</h4>
                    <p className="text-sm text-muted-foreground">
                      Read each question carefully and select your answer before time runs out.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">3. Get Instant Feedback</h4>
                    <p className="text-sm text-muted-foreground">
                      See if you're correct immediately, along with explanations when available.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">4. Review Results</h4>
                    <p className="text-sm text-muted-foreground">
                      Check your score, review all answers, and challenge yourself to improve.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Scoring System */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Scoring System
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-success/10 rounded-lg">
                    <div className="text-2xl font-bold text-success mb-2">+10</div>
                    <p className="text-sm font-medium">Correct Answer</p>
                    <p className="text-xs text-muted-foreground">Base points for each correct answer</p>
                  </div>
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-2">+Time</div>
                    <p className="text-sm font-medium">Speed Bonus</p>
                    <p className="text-xs text-muted-foreground">Extra points for remaining seconds</p>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-muted-foreground mb-2">0</div>
                    <p className="text-sm font-medium">Wrong Answer</p>
                    <p className="text-xs text-muted-foreground">No penalty, just keep learning!</p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Example Calculation</h4>
                  <p className="text-sm text-muted-foreground">
                    If you answer correctly with 8 seconds remaining: <strong>10 + 8 = 18 points</strong>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Timer Rules */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Timer Rules
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Timer Behavior</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Timer starts when question appears
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        Countdown shows remaining seconds
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-warning rounded-full"></div>
                        Warning at 5 seconds (red text)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-destructive rounded-full"></div>
                        Auto-advance when time expires
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Time Settings</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex justify-between">
                        <span>Quick Fire:</span>
                        <span className="font-medium">10 seconds</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Standard:</span>
                        <span className="font-medium">15 seconds</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Relaxed:</span>
                        <span className="font-medium">30 seconds</span>
                      </li>
                      <li className="flex justify-between">
                        <span>No Pressure:</span>
                        <span className="font-medium">60 seconds</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Keyboard Shortcuts */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Keyboard className="w-5 h-5 text-primary" />
                  Keyboard Shortcuts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">During Questions</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm">Select Answer A</span>
                        <kbd className="px-2 py-1 bg-background border rounded text-xs">1</kbd>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm">Select Answer B</span>
                        <kbd className="px-2 py-1 bg-background border rounded text-xs">2</kbd>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm">Select Answer C</span>
                        <kbd className="px-2 py-1 bg-background border rounded text-xs">3</kbd>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm">Select Answer D</span>
                        <kbd className="px-2 py-1 bg-background border rounded text-xs">4</kbd>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Navigation</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm">Next Question</span>
                        <kbd className="px-2 py-1 bg-background border rounded text-xs">Enter</kbd>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-sm">Go to Home</span>
                        <kbd className="px-2 py-1 bg-background border rounded text-xs">Esc</kbd>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                      <p className="text-xs text-primary">
                        <strong>Pro Tip:</strong> Use keyboard shortcuts for faster gameplay and higher scores!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>Available Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {[
                    "General Knowledge", "Entertainment: Books", "Entertainment: Film", "Entertainment: Music",
                    "Science & Nature", "Science: Computers", "Science: Mathematics", "Mythology",
                    "Sports", "Geography", "History", "Politics", "Art"
                  ].map((category) => (
                    <div key={category} className="p-3 bg-muted/50 rounded-lg text-center">
                      <span className="text-sm font-medium">{category}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-8">
            <h3 className="text-xl font-semibold mb-4">Ready to Test Your Knowledge?</h3>
            <Link to="/setup">
              <Button size="lg" className="gradient-primary shadow-glow">
                Start Playing Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;