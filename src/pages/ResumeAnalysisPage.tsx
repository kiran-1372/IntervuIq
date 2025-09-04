import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Download,
  Copy,
  Zap
} from "lucide-react";

const mockAnalysis = {
  score: 78,
  strengths: [
    "Strong technical background with 5+ years of experience",
    "Relevant programming languages (Python, JavaScript, Go)",
    "Leadership experience mentioned with team size",
    "Quantified achievements with metrics"
  ],
  improvements: [
    "Add cloud platform experience (AWS, Azure, GCP)",
    "Include system design keywords and experience",
    "Mention DevOps/CI-CD pipeline experience", 
    "Add mobile development experience if relevant"
  ],
  missingKeywords: [
    "Kubernetes", "Docker", "Microservices", "REST APIs", 
    "GraphQL", "Redis", "Machine Learning", "Agile/Scrum"
  ],
  suggestedBullets: [
    "• Architected and deployed scalable microservices using Docker and Kubernetes, handling 10M+ requests daily",
    "• Led cross-functional team of 8 engineers to deliver cloud-native solutions, reducing infrastructure costs by 35%",
    "• Implemented CI/CD pipelines using Jenkins and AWS, reducing deployment time from 2 hours to 15 minutes"
  ]
};

export function ResumeAnalysisPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen p-4 mx-auto max-w-7xl"
    >
      {/* Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl font-bold mb-2"
        >
          AI Resume Analysis
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-muted-foreground"
        >
          Upload your resume and job description to get AI-powered optimization recommendations
        </motion.p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Upload Documents</h2>
            
            {/* Resume Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Resume Content</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-3">
                  Upload PDF/DOC or paste text below
                </p>
                <Button variant="outline" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>
              <Textarea
                placeholder="Or paste your resume content here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="mt-3 min-h-32"
              />
            </div>

            {/* Job Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Job Description</label>
              <Textarea
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-32"
              />
            </div>

            <Button 
              onClick={handleAnalyze}
              disabled={!resumeText || !jobDescription || isAnalyzing}
              className="w-full gap-2"
            >
              {isAnalyzing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap className="w-4 h-4" />
                  </motion.div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Analyze Resume
                </>
              )}
            </Button>
          </Card>
        </motion.div>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {showResults ? (
            <div className="space-y-6">
              {/* Overall Score */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Match Score</h3>
                  <div className="text-2xl font-bold text-primary">{mockAnalysis.score}%</div>
                </div>
                <Progress value={mockAnalysis.score} className="mb-3" />
                <p className="text-sm text-muted-foreground">
                  Good match! Your resume aligns well with the job requirements.
                </p>
              </Card>

              {/* Strengths */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <h3 className="text-lg font-semibold">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {mockAnalysis.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Improvements */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  <h3 className="text-lg font-semibold">Areas for Improvement</h3>
                </div>
                <ul className="space-y-2">
                  {mockAnalysis.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-warning rounded-full mt-2 flex-shrink-0" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Missing Keywords */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-info" />
                  <h3 className="text-lg font-semibold">Missing Keywords</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mockAnalysis.missingKeywords.map((keyword) => (
                    <Badge key={keyword} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Suggested Bullets */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Suggested Bullet Points</h3>
                <div className="space-y-3">
                  {mockAnalysis.suggestedBullets.map((bullet, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-start gap-2">
                        <p className="text-sm flex-1">{bullet}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(bullet)}
                          className="h-8 w-8 p-0 flex-shrink-0"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Actions */}
              <div className="flex gap-3">
                <Button className="gap-2">
                  <Download className="w-4 h-4" />
                  Download Report
                </Button>
                <Button variant="outline" onClick={() => setShowResults(false)}>
                  Analyze Another
                </Button>
              </div>
            </div>
          ) : (
            <Card className="p-12 text-center">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
              <p className="text-muted-foreground">
                Upload your resume and job description to get started with AI-powered analysis
              </p>
            </Card>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}