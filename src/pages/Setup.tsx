import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Play, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { id: "9", name: "General Knowledge" },
  { id: "10", name: "Entertainment: Books" },
  { id: "11", name: "Entertainment: Film" },
  { id: "12", name: "Entertainment: Music" },
  { id: "17", name: "Science & Nature" },
  { id: "18", name: "Science: Computers" },
  { id: "19", name: "Science: Mathematics" },
  { id: "20", name: "Mythology" },
  { id: "21", name: "Sports" },
  { id: "22", name: "Geography" },
  { id: "23", name: "History" },
  { id: "24", name: "Politics" },
  { id: "25", name: "Art" },
];

const Setup = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    category: "9",
    difficulty: "medium",
    amount: "10",
    timePerQuestion: "15"
  });

  const handleStartQuiz = () => {
    // Store settings in localStorage for the quiz component
    localStorage.setItem('quizSettings', JSON.stringify(settings));
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8 animate-fade-in">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Customize Your Quiz</h1>
              <p className="text-muted-foreground">Choose your preferred settings for the perfect challenge</p>
            </div>
          </div>

          {/* Settings Card */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Quiz Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={settings.category} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Difficulty */}
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select 
                  value={settings.difficulty} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, difficulty: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Number of Questions */}
              <div className="space-y-2">
                <Label htmlFor="amount">Number of Questions</Label>
                <Select 
                  value={settings.amount} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, amount: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Questions</SelectItem>
                    <SelectItem value="10">10 Questions</SelectItem>
                    <SelectItem value="15">15 Questions</SelectItem>
                    <SelectItem value="20">20 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Time per Question */}
              <div className="space-y-2">
                <Label htmlFor="time">Time per Question</Label>
                <Select 
                  value={settings.timePerQuestion} 
                  onValueChange={(value) => setSettings(prev => ({ ...prev, timePerQuestion: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 seconds</SelectItem>
                    <SelectItem value="15">15 seconds</SelectItem>
                    <SelectItem value="30">30 seconds</SelectItem>
                    <SelectItem value="60">60 seconds</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Start Button */}
              <Button 
                onClick={handleStartQuiz}
                className="w-full gradient-primary shadow-glow hover:shadow-lg transition-all duration-300"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Quiz
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Setup;