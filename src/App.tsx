import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Setup from "./pages/Setup";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import HighScores from "./pages/HighScores";
import HowToPlay from "./pages/HowToPlay";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
          <Route path="/high-scores" element={<HighScores />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
