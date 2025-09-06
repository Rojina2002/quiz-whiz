import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlayCircle, Trophy, HelpCircle, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-trivia.jpg";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative container mx-auto px-4 py-20">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-bounce-gentle">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">New & Improved Quiz Experience</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              QuizWhiz
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Fast, fun, and endlessly replayable trivia. Challenge your knowledge across countless categories!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/setup">
                <Button size="lg" className="gradient-primary shadow-glow hover:shadow-lg transition-all duration-300 animate-pulse-glow">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Play Now
                </Button>
              </Link>
              
              <Link to="/high-scores">
                <Button variant="outline" size="lg" className="hover:bg-primary/10">
                  <Trophy className="w-5 h-5 mr-2" />
                  High Scores
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 animate-fade-in">
            <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <PlayCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Quick Start</h3>
            <p className="text-muted-foreground text-sm">
              Jump into a quiz instantly or customize your perfect challenge
            </p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 animate-fade-in">
            <div className="w-12 h-12 gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
            <p className="text-muted-foreground text-sm">
              Monitor your scores, streaks, and improvement over time
            </p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 animate-fade-in">
            <div className="w-12 h-12 gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Learn & Grow</h3>
            <p className="text-muted-foreground text-sm">
              Detailed explanations help you learn from every question
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;