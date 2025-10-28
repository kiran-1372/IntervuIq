import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Wand2, Plus, Trash2, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

type InterviewRound = {
  id: string;
  name: string;
  type: string;
  status: string;
  date?: Date;
  duration: string;
  interviewer: string;
  confidence: number;
  feedback: string;
  experience: string;
  questions: Array<{
    id: string;
    question: string;
    topics: string;
    difficulty: string;
    feedback: string;
  }>;
};

export default function AddInterviewPage() {
  const [mode, setMode] = useState<"manual" | "jd">("manual");
  const [isExtracting, setIsExtracting] = useState(false);
  const [jdText, setJdText] = useState("");
  
  // Manual form state
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState<Date>();
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [salary, setSalary] = useState("");
  const [hrName, setHrName] = useState("");
  const [hrEmail, setHrEmail] = useState("");
  const [hrPhone, setHrPhone] = useState("");
  const [overallFeedback, setOverallFeedback] = useState("");
  const [nextSteps, setNextSteps] = useState("");
  const [rounds, setRounds] = useState<InterviewRound[]>([]);

  const handleExtractJD = async () => {
    if (!jdText.trim()) {
      toast({
        title: "Empty Job Description",
        description: "Please paste a job description to extract details.",
        variant: "destructive",
      });
      return;
    }

    setIsExtracting(true);
    // Simulate AI extraction
    setTimeout(() => {
      // Mock extraction
      setCompany("Tech Corp Inc.");
      setRole("Senior Software Engineer");
      setLocation("San Francisco, CA");
      setIsExtracting(false);
      toast({
        title: "Details Extracted!",
        description: "Company, role, and location have been auto-filled. Please review and edit as needed.",
      });
    }, 2000);
  };

  const handleSaveInterview = () => {
    if (!company || !role) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least Company and Role fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Interview Saved!",
      description: "Your interview details have been saved successfully.",
    });
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved!",
      description: "You can continue editing this later from your drafts.",
    });
  };

  const addRound = () => {
    const newRound: InterviewRound = {
      id: Date.now().toString(),
      name: "",
      type: "",
      status: "",
      duration: "",
      interviewer: "",
      confidence: 50,
      feedback: "",
      experience: "",
      questions: [],
    };
    setRounds([...rounds, newRound]);
  };

  const removeRound = (id: string) => {
    setRounds(rounds.filter(r => r.id !== id));
  };

  const updateRound = (id: string, field: keyof InterviewRound, value: any) => {
    setRounds(rounds.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const addQuestion = (roundId: string) => {
    setRounds(rounds.map(r => {
      if (r.id === roundId) {
        return {
          ...r,
          questions: [...r.questions, {
            id: Date.now().toString(),
            question: "",
            topics: "",
            difficulty: "",
            feedback: "",
          }]
        };
      }
      return r;
    }));
  };

  const removeQuestion = (roundId: string, questionId: string) => {
    setRounds(rounds.map(r => {
      if (r.id === roundId) {
        return {
          ...r,
          questions: r.questions.filter(q => q.id !== questionId)
        };
      }
      return r;
    }));
  };

  const updateQuestion = (roundId: string, questionId: string, field: string, value: string) => {
    setRounds(rounds.map(r => {
      if (r.id === roundId) {
        return {
          ...r,
          questions: r.questions.map(q => q.id === questionId ? { ...q, [field]: value } : q)
        };
      }
      return r;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Add Interview Details
          </h1>
          <p className="text-muted-foreground">
            Add your interview experience manually or auto-fill using your Job Description (JD).
          </p>
        </motion.div>

        {/* Mode Selection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid md:grid-cols-2 gap-4 mb-8"
        >
          <Card
            className={cn(
              "cursor-pointer transition-all duration-300 hover:shadow-lg",
              mode === "manual" && "ring-2 ring-primary shadow-lg scale-105"
            )}
            onClick={() => setMode("manual")}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-3 rounded-lg transition-colors",
                  mode === "manual" ? "bg-primary text-primary-foreground" : "bg-muted"
                )}>
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">Manual Entry</CardTitle>
                  <CardDescription>Fill out all interview details manually.</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card
            className={cn(
              "cursor-pointer transition-all duration-300 hover:shadow-lg",
              mode === "jd" && "ring-2 ring-secondary shadow-lg scale-105"
            )}
            onClick={() => setMode("jd")}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-3 rounded-lg transition-colors",
                  mode === "jd" ? "bg-secondary text-secondary-foreground" : "bg-muted"
                )}>
                  <Wand2 className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">Use Job Description (JD)</CardTitle>
                  <CardDescription>Paste a JD and let AI pre-fill details for you.</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* JD Mode */}
        {mode === "jd" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Paste Job Description</CardTitle>
                <CardDescription>
                  AI will extract company, role, location, and skills automatically.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your Job Description here..."
                  className="min-h-[200px] resize-none"
                  value={jdText}
                  onChange={(e) => setJdText(e.target.value)}
                />
                <Button
                  onClick={handleExtractJD}
                  disabled={isExtracting}
                  className="w-full"
                >
                  {isExtracting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Wand2 className="w-4 h-4" />
                      </motion.div>
                      Extracting Details...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Extract Details
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Interview Information</CardTitle>
              <CardDescription>
                {mode === "jd" ? "Review and edit auto-filled details" : "Enter all details manually"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name *</label>
                  <Input
                    placeholder="e.g., Google"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role / Position *</label>
                  <Input
                    placeholder="e.g., Senior Software Engineer"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    placeholder="e.g., San Francisco, CA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="offer">Offer</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="interviewing">Interviewing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Salary (Optional)</label>
                  <Input
                    placeholder="e.g., $120,000"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </div>
              </div>

              {/* HR Contact */}
              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-semibold">HR Contact</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      placeholder="HR Name"
                      value={hrName}
                      onChange={(e) => setHrName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="hr@company.com"
                      value={hrEmail}
                      onChange={(e) => setHrEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      placeholder="+1 234 567 8900"
                      value={hrPhone}
                      onChange={(e) => setHrPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Feedback */}
              <div className="space-y-4 pt-4 border-t">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Overall Feedback</label>
                  <Textarea
                    placeholder="Share your overall experience..."
                    className="min-h-[100px]"
                    value={overallFeedback}
                    onChange={(e) => setOverallFeedback(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Next Steps</label>
                  <Textarea
                    placeholder="What are the next steps or follow-ups?"
                    className="min-h-[80px]"
                    value={nextSteps}
                    onChange={(e) => setNextSteps(e.target.value)}
                  />
                </div>
              </div>

              {/* Rounds Section */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Interview Rounds</h3>
                  <Button onClick={addRound} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Round
                  </Button>
                </div>

                {rounds.map((round, roundIndex) => (
                  <Card key={round.id} className="border-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Round {roundIndex + 1}</CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeRound(round.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Round Name</label>
                          <Input
                            placeholder="e.g., Technical Round 1"
                            value={round.name}
                            onChange={(e) => updateRound(round.id, "name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Type</label>
                          <Select
                            value={round.type}
                            onValueChange={(v) => updateRound(round.id, "type", v)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="coding">Coding</SelectItem>
                              <SelectItem value="behavioral">Behavioral</SelectItem>
                              <SelectItem value="system-design">System Design</SelectItem>
                              <SelectItem value="hr">HR</SelectItem>
                              <SelectItem value="technical">Technical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Status</label>
                          <Select
                            value={round.status}
                            onValueChange={(v) => updateRound(round.id, "status", v)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="passed">Passed</SelectItem>
                              <SelectItem value="failed">Failed</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Duration</label>
                          <Input
                            placeholder="e.g., 60 mins"
                            value={round.duration}
                            onChange={(e) => updateRound(round.id, "duration", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Interviewer</label>
                          <Input
                            placeholder="Name"
                            value={round.interviewer}
                            onChange={(e) => updateRound(round.id, "interviewer", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Confidence Level: {round.confidence}%
                        </label>
                        <Slider
                          value={[round.confidence]}
                          onValueChange={(v) => updateRound(round.id, "confidence", v[0])}
                          max={100}
                          step={5}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Feedback</label>
                        <Textarea
                          placeholder="Feedback from the interviewer..."
                          value={round.feedback}
                          onChange={(e) => updateRound(round.id, "feedback", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Your Experience</label>
                        <Textarea
                          placeholder="Describe your experience in this round..."
                          value={round.experience}
                          onChange={(e) => updateRound(round.id, "experience", e.target.value)}
                        />
                      </div>

                      {/* Questions */}
                      <div className="space-y-3 pt-3 border-t">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">Questions Asked</label>
                          <Button
                            onClick={() => addQuestion(round.id)}
                            size="sm"
                            variant="ghost"
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Add Question
                          </Button>
                        </div>

                        {round.questions.map((q, qIndex) => (
                          <Card key={q.id} className="bg-muted/50">
                            <CardContent className="pt-4 space-y-3">
                              <div className="flex items-start justify-between gap-2">
                                <span className="text-xs font-semibold text-muted-foreground">
                                  Question {qIndex + 1}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeQuestion(round.id, q.id)}
                                >
                                  <Trash2 className="w-3 h-3 text-destructive" />
                                </Button>
                              </div>
                              <Input
                                placeholder="Question text"
                                value={q.question}
                                onChange={(e) => updateQuestion(round.id, q.id, "question", e.target.value)}
                              />
                              <div className="grid grid-cols-2 gap-2">
                                <Input
                                  placeholder="Topics (e.g., Arrays, DP)"
                                  value={q.topics}
                                  onChange={(e) => updateQuestion(round.id, q.id, "topics", e.target.value)}
                                />
                                <Select
                                  value={q.difficulty}
                                  onValueChange={(v) => updateQuestion(round.id, q.id, "difficulty", v)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Difficulty" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="easy">Easy</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="hard">Hard</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <Textarea
                                placeholder="Your feedback on this question..."
                                value={q.feedback}
                                onChange={(e) => updateQuestion(round.id, q.id, "feedback", e.target.value)}
                                className="min-h-[60px]"
                              />
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
                <Button
                  onClick={handleSaveDraft}
                  variant="outline"
                  className="flex-1"
                >
                  💾 Save Draft
                </Button>
                <Button
                  onClick={handleSaveInterview}
                  className="flex-1"
                >
                  ✅ Save Interview
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                💡 You can save partially filled forms and continue later from your drafts.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
