import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header } from "@/components/layout/Header";
import { HomePage } from "./pages/HomePage";
import { InterviewsPage } from "./pages/InterviewsPage";
import { ResumeAnalysisPage } from "./pages/ResumeAnalysisPage";
import { ColdEmailPage } from "./pages/ColdEmailPage";
import { QuestionBankPage } from "./pages/QuestionBankPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="intervu-iq-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/interviews" element={<InterviewsPage />} />
              <Route path="/resume" element={<ResumeAnalysisPage />} />
              <Route path="/email" element={<ColdEmailPage />} />
              <Route path="/questions" element={<QuestionBankPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
