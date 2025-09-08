import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Download,
  Copy,
  Zap,
  ExternalLink,
  BookOpen,
  Play
} from "lucide-react";
import { resumeAnalysisData } from "@/data/dummyData";

// Use the comprehensive dummy data

export function ResumeAnalysisPage() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate file processing
      const mockResumeText = `John Smith
Software Engineer

Experience:
• 5+ years of full-stack development experience
• Proficient in Python, JavaScript, and Go
• Led a team of 6 developers on multiple projects
• Implemented scalable web applications serving 100K+ users

Education:
• B.S. Computer Science, University of Technology

Skills:
• Programming: Python, JavaScript, Go, React, Node.js
• Databases: PostgreSQL, MongoDB
• Tools: Git, Docker, Jenkins`;
      setResumeText(mockResumeText);
    }
  };

  const handleJobUrlExtract = () => {
    if (jobUrl) {
      // Simulate JD extraction from URL
      const mockJD = `We are looking for a Senior Software Engineer to join our team.

Requirements:
• 5+ years of software development experience
• Strong knowledge of Python, JavaScript, and modern frameworks
• Experience with cloud platforms (AWS, Azure, GCP)
• Knowledge of containerization (Docker, Kubernetes)
• System design and architecture experience
• Experience with microservices and REST APIs
• DevOps and CI/CD pipeline experience
• Strong problem-solving and communication skills

Nice to have:
• Machine Learning experience
• Experience with GraphQL
• Redis and caching strategies
• Agile/Scrum methodology`;
      setJobDescription(mockJD);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen gradient-hero p-4 mx-auto max-w-7xl"
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
          <Card className="p-6 gradient-card border-0 shadow-md">
            <h2 className="text-xl font-semibold mb-6">Upload Documents</h2>
            
            {/* Resume Upload */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">Resume Content</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-3">
                  {uploadedFile ? `Uploaded: ${uploadedFile.name}` : "Upload PDF/DOC or paste text below"}
                </p>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </div>
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
              <Label className="text-sm font-medium mb-3 block">Job Description</Label>
              
              {/* Job URL Input */}
              <div className="mb-4">
                <Label className="text-sm font-medium mb-2 block">Job URL (Optional)</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://company.com/jobs/software-engineer"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleJobUrlExtract}
                    disabled={!jobUrl}
                    className="gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Extract
                  </Button>
                </div>
              </div>

              <Textarea
                placeholder="Or paste the job description here..."
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
              <Card className="p-6 gradient-card border-0 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Match Score</h3>
                  <div className="text-2xl font-bold text-primary">{resumeAnalysisData.score}%</div>
                </div>
                <Progress value={resumeAnalysisData.score} className="mb-3" />
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">ATS Score</span>
                  <span className="text-sm font-bold text-secondary">{resumeAnalysisData.atsScore}%</span>
                </div>
                <Progress value={resumeAnalysisData.atsScore} className="mb-3" />
                
                <p className="text-sm text-muted-foreground">
                  Good match! Your resume aligns well with the job requirements.
                </p>
              </Card>

              {/* Strengths */}
              <Card className="p-6 gradient-card border-0 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                  <h3 className="text-lg font-semibold">Strengths</h3>
                </div>
                <ul className="space-y-2">
                  {resumeAnalysisData.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0" />
                      {strength}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Improvements */}
              <Card className="p-6 gradient-card border-0 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  <h3 className="text-lg font-semibold">Areas for Improvement</h3>
                </div>
                <ul className="space-y-2">
                  {resumeAnalysisData.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-warning rounded-full mt-2 flex-shrink-0" />
                      {improvement}
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Missing Keywords */}
              <Card className="p-6 gradient-card border-0 shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-info" />
                  <h3 className="text-lg font-semibold">Missing Keywords</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeAnalysisData.missingKeywords.map((keyword) => (
                    <Badge key={keyword} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </Card>

              {/* Suggested Bullets */}
              <Card className="p-6 gradient-card border-0 shadow-md">
                <h3 className="text-lg font-semibold mb-4">Suggested Bullet Points</h3>
                <div className="space-y-3">
                  {resumeAnalysisData.suggestedBullets.map((bullet, index) => (
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

              {/* Skill Gaps & Resources */}
              <Card className="p-6 gradient-card border-0 shadow-md">
                <h3 className="text-lg font-semibold mb-4">Skill Gaps & Learning Resources</h3>
                <div className="space-y-4">
                  {resumeAnalysisData.skillGaps.map((skillGap, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{skillGap.skill}</h4>
                        <Badge 
                          variant={skillGap.importance === 'high' ? 'destructive' : 
                                  skillGap.importance === 'medium' ? 'default' : 'secondary'}
                        >
                          {skillGap.importance} priority
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {skillGap.resources.map((resource, resourceIndex) => (
                          <div key={resourceIndex} className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                            {resource.type === 'course' && <BookOpen className="w-4 h-4 text-blue-500" />}
                            {resource.type === 'project' && <FileText className="w-4 h-4 text-green-500" />}
                            {resource.type === 'video' && <Play className="w-4 h-4 text-red-500" />}
                            {resource.type === 'article' && <FileText className="w-4 h-4 text-purple-500" />}
                            <div className="flex-1">
                              <p className="text-sm font-medium">{resource.title}</p>
                              <p className="text-xs text-muted-foreground">{resource.provider}</p>
                            </div>
                            <Button variant="ghost" size="sm" asChild>
                              <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          </div>
                        ))}
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
            <Card className="p-12 text-center gradient-card border-0 shadow-md">
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