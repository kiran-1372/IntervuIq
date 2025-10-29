import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  Briefcase, 
  Calendar as CalendarIcon, 
  MapPin, 
  DollarSign,
  User,
  Mail,
  Phone,
  FileText,
  Plus,
  Trash2,
  Check,
  CheckCircle2,
  Edit,
  Save,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

type Question = {
  id: string;
  question: string;
  topics: string;
  difficulty: string;
  answer: string;
  feedback: string;
  isPublic: boolean;
};

type Round = {
  id: string;
  name: string;
  type: string;
  status: string;
  date?: Date;
  interviewer: string;
  confidence: number;
  feedback: string;
  isSaved: boolean;
  questions: Question[];
};

type InterviewData = {
  id?: string;
  company: string;
  role: string;
  date?: Date;
  location: string;
  status: string;
  salary: string;
  hrName: string;
  hrEmail: string;
  hrPhone: string;
  feedback: string;
  nextSteps: string;
  isSaved: boolean;
};

export default function AddInterviewPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  
  // Interview Details State
  const [interview, setInterview] = useState<InterviewData>({
    company: "",
    role: "",
    location: "",
    status: "",
    salary: "",
    hrName: "",
    hrEmail: "",
    hrPhone: "",
    feedback: "",
    nextSteps: "",
    isSaved: false,
  });

  const [rounds, setRounds] = useState<Round[]>([]);
  const [expandedRound, setExpandedRound] = useState<string>("");

  // Calculate progress
  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  // Update interview field
  const updateInterview = (field: keyof InterviewData, value: any) => {
    setInterview(prev => ({ ...prev, [field]: value }));
  };

  // Save Interview (Step 1)
  const saveInterviewDetails = async () => {
    if (!interview.company || !interview.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least Company and Role fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    // Simulate API call: POST /api/interviews
    setTimeout(() => {
      const mockInterviewId = `int_${Date.now()}`;
      setInterview(prev => ({ 
        ...prev, 
        id: mockInterviewId, 
        isSaved: true 
      }));
      setIsSaving(false);
      setCurrentStep(2);
      
      toast({
        title: "✅ Interview Saved!",
        description: "Now add rounds to this interview.",
      });
    }, 1000);
  };

  // Add Round (Step 2)
  const addRound = () => {
    const newRound: Round = {
      id: `round_${Date.now()}`,
      name: "",
      type: "",
      status: "",
      interviewer: "",
      confidence: 50,
      feedback: "",
      isSaved: false,
      questions: [],
    };
    setRounds([...rounds, newRound]);
    setExpandedRound(newRound.id);
  };

  // Update Round
  const updateRound = (roundId: string, field: keyof Round, value: any) => {
    setRounds(rounds.map(r => 
      r.id === roundId ? { ...r, [field]: value } : r
    ));
  };

  // Save Round
  const saveRound = async (roundId: string) => {
    const round = rounds.find(r => r.id === roundId);
    if (!round?.name || !round?.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in Round Name and Type.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    // Simulate API call: POST /api/rounds?interviewId=${interview.id}
    setTimeout(() => {
      setRounds(rounds.map(r => 
        r.id === roundId ? { ...r, isSaved: true } : r
      ));
      setIsSaving(false);
      
      toast({
        title: "Round Saved!",
        description: "You can now add questions to this round.",
      });
    }, 800);
  };

  // Delete Round
  const deleteRound = (roundId: string) => {
    setRounds(rounds.filter(r => r.id !== roundId));
    toast({
      title: "Round Deleted",
      description: "The round has been removed.",
    });
  };

  // Add Question (Step 3)
  const addQuestion = (roundId: string) => {
    const newQuestion: Question = {
      id: `q_${Date.now()}`,
      question: "",
      topics: "",
      difficulty: "",
      answer: "",
      feedback: "",
      isPublic: false,
    };
    
    setRounds(rounds.map(r => {
      if (r.id === roundId) {
        return { ...r, questions: [...r.questions, newQuestion] };
      }
      return r;
    }));
  };

  // Update Question
  const updateQuestion = (roundId: string, questionId: string, field: keyof Question, value: any) => {
    setRounds(rounds.map(r => {
      if (r.id === roundId) {
        return {
          ...r,
          questions: r.questions.map(q => 
            q.id === questionId ? { ...q, [field]: value } : q
          )
        };
      }
      return r;
    }));
  };

  // Delete Question
  const deleteQuestion = (roundId: string, questionId: string) => {
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

  // Save Question
  const saveQuestion = async (roundId: string, questionId: string) => {
    const round = rounds.find(r => r.id === roundId);
    const question = round?.questions.find(q => q.id === questionId);
    
    if (!question?.question) {
      toast({
        title: "Missing Information",
        description: "Please fill in the question text.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    // Simulate API call: POST /api/questions?roundId=${roundId}
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Question Saved!",
        description: "Your question has been added successfully.",
      });
    }, 600);
  };

  // Submit Final Interview
  const submitInterview = async () => {
    setIsSaving(true);
    
    // Simulate API call: PATCH /api/interviews/:id/submit
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Interview Submitted!",
        description: "Your interview has been marked as completed.",
      });
      setCurrentStep(3);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Add Interview Experience
          </h1>
          <p className="text-muted-foreground">
            Record your interview details, rounds, and questions step by step.
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                    currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {interview.isSaved ? <Check className="w-4 h-4" /> : "1"}
                  </div>
                  <span className="text-sm font-medium">Interview Details</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                    currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    {rounds.some(r => r.isSaved) ? <Check className="w-4 h-4" /> : "2"}
                  </div>
                  <span className="text-sm font-medium">Add Rounds</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                    currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    3
                  </div>
                  <span className="text-sm font-medium">Review & Submit</span>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Step 1: Interview Details */}
          {currentStep >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <Card className={cn(
                "transition-all",
                interview.isSaved && "border-success bg-success/5"
              )}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-primary" />
                        Step 1: Interview Details
                      </CardTitle>
                      <CardDescription>
                        Enter basic information about the interview
                      </CardDescription>
                    </div>
                    {interview.isSaved && (
                      <CheckCircle2 className="w-6 h-6 text-success" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-primary" />
                        Company Name *
                      </label>
                      <Input
                        placeholder="e.g., Google"
                        value={interview.company}
                        onChange={(e) => updateInterview("company", e.target.value)}
                        disabled={interview.isSaved}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary" />
                        Role / Position *
                      </label>
                      <Input
                        placeholder="e.g., Senior Software Engineer"
                        value={interview.role}
                        onChange={(e) => updateInterview("role", e.target.value)}
                        disabled={interview.isSaved}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-primary" />
                        Date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !interview.date && "text-muted-foreground"
                            )}
                            disabled={interview.isSaved}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {interview.date ? format(interview.date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={interview.date}
                            onSelect={(date) => updateInterview("date", date)}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        Location
                      </label>
                      <Input
                        placeholder="e.g., San Francisco, CA"
                        value={interview.location}
                        onChange={(e) => updateInterview("location", e.target.value)}
                        disabled={interview.isSaved}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Select 
                        value={interview.status} 
                        onValueChange={(v) => updateInterview("status", v)}
                        disabled={interview.isSaved}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="interviewing">Interviewing</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="offer">Offer</SelectItem>
                          <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-primary" />
                        Salary (Optional)
                      </label>
                      <Input
                        placeholder="e.g., $120,000"
                        value={interview.salary}
                        onChange={(e) => updateInterview("salary", e.target.value)}
                        disabled={interview.isSaved}
                      />
                    </div>
                  </div>

                  {/* HR Contact */}
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-sm font-semibold text-muted-foreground">HR Contact (Optional)</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" />
                          Name
                        </label>
                        <Input
                          placeholder="HR Name"
                          value={interview.hrName}
                          onChange={(e) => updateInterview("hrName", e.target.value)}
                          disabled={interview.isSaved}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary" />
                          Email
                        </label>
                        <Input
                          type="email"
                          placeholder="hr@company.com"
                          value={interview.hrEmail}
                          onChange={(e) => updateInterview("hrEmail", e.target.value)}
                          disabled={interview.isSaved}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Phone className="w-4 h-4 text-primary" />
                          Phone
                        </label>
                        <Input
                          placeholder="+1 234 567 8900"
                          value={interview.hrPhone}
                          onChange={(e) => updateInterview("hrPhone", e.target.value)}
                          disabled={interview.isSaved}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Feedback */}
                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Feedback or Notes</label>
                      <Textarea
                        placeholder="Share your overall experience..."
                        className="min-h-[80px]"
                        value={interview.feedback}
                        onChange={(e) => updateInterview("feedback", e.target.value)}
                        disabled={interview.isSaved}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Next Steps</label>
                      <Textarea
                        placeholder="What are the next steps or follow-ups?"
                        className="min-h-[60px]"
                        value={interview.nextSteps}
                        onChange={(e) => updateInterview("nextSteps", e.target.value)}
                        disabled={interview.isSaved}
                      />
                    </div>
                  </div>

                  {!interview.isSaved && (
                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={saveInterviewDetails}
                        disabled={isSaving}
                        className="flex-1"
                        size="lg"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Interview
                          </>
                        )}
                      </Button>
                    </div>
                  )}

                  {interview.isSaved && (
                    <div className="flex items-center gap-2 p-4 bg-success/10 rounded-lg border border-success/20">
                      <CheckCircle2 className="w-5 h-5 text-success" />
                      <span className="text-sm font-medium text-success-foreground">
                        Interview details saved! Proceed to add rounds below.
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Add Rounds */}
          {interview.isSaved && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        Step 2: Interview Rounds
                      </CardTitle>
                      <CardDescription>
                        Add rounds for this interview. Each round can have multiple questions.
                      </CardDescription>
                    </div>
                    <Button onClick={addRound} size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Round
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {rounds.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                      <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-4">No rounds added yet</p>
                      <Button onClick={addRound} variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Round
                      </Button>
                    </div>
                  ) : (
                    <Accordion type="single" collapsible value={expandedRound} onValueChange={setExpandedRound}>
                      {rounds.map((round, index) => (
                        <AccordionItem key={round.id} value={round.id} className="border rounded-lg mb-4 px-4">
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-3 flex-1">
                              {round.isSaved && (
                                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                              )}
                              <div className="text-left">
                                <div className="font-semibold">
                                  {round.name || `Round ${index + 1}`}
                                </div>
                                {round.type && (
                                  <div className="text-xs text-muted-foreground">
                                    {round.type} {round.status && `• ${round.status}`}
                                  </div>
                                )}
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 pt-4">
                              {/* Round Details */}
                              <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Round Name *</label>
                                  <Input
                                    placeholder="e.g., Technical Round 1"
                                    value={round.name}
                                    onChange={(e) => updateRound(round.id, "name", e.target.value)}
                                    disabled={round.isSaved}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Type *</label>
                                  <Select
                                    value={round.type}
                                    onValueChange={(v) => updateRound(round.id, "type", v)}
                                    disabled={round.isSaved}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="technical">Technical</SelectItem>
                                      <SelectItem value="coding">Coding</SelectItem>
                                      <SelectItem value="system-design">System Design</SelectItem>
                                      <SelectItem value="behavioral">Behavioral</SelectItem>
                                      <SelectItem value="hr">HR</SelectItem>
                                      <SelectItem value="managerial">Managerial</SelectItem>
                                    </SelectContent>
                                  </Select>
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
                                          !round.date && "text-muted-foreground"
                                        )}
                                        disabled={round.isSaved}
                                      >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {round.date ? format(round.date, "PPP") : <span>Pick a date</span>}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={round.date}
                                        onSelect={(date) => updateRound(round.id, "date", date)}
                                        initialFocus
                                        className="pointer-events-auto"
                                      />
                                    </PopoverContent>
                                  </Popover>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Status</label>
                                  <Select
                                    value={round.status}
                                    onValueChange={(v) => updateRound(round.id, "status", v)}
                                    disabled={round.isSaved}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="completed">Completed</SelectItem>
                                      <SelectItem value="scheduled">Scheduled</SelectItem>
                                      <SelectItem value="pending">Pending</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium">Interviewer Name</label>
                                <Input
                                  placeholder="Interviewer's name"
                                  value={round.interviewer}
                                  onChange={(e) => updateRound(round.id, "interviewer", e.target.value)}
                                  disabled={round.isSaved}
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium">
                                  Confidence Level: {round.confidence}%
                                </label>
                                <Slider
                                  value={[round.confidence]}
                                  onValueChange={(v) => updateRound(round.id, "confidence", v[0])}
                                  max={100}
                                  step={10}
                                  disabled={round.isSaved}
                                />
                              </div>

                              <div className="space-y-2">
                                <label className="text-sm font-medium">Feedback or Notes</label>
                                <Textarea
                                  placeholder="Share your experience in this round..."
                                  className="min-h-[80px]"
                                  value={round.feedback}
                                  onChange={(e) => updateRound(round.id, "feedback", e.target.value)}
                                  disabled={round.isSaved}
                                />
                              </div>

                              {!round.isSaved && (
                                <div className="flex gap-3 pt-2">
                                  <Button
                                    onClick={() => saveRound(round.id)}
                                    disabled={isSaving}
                                    className="flex-1"
                                  >
                                    {isSaving ? (
                                      <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Saving...
                                      </>
                                    ) : (
                                      <>
                                        <Save className="w-4 h-4 mr-2" />
                                        Save Round
                                      </>
                                    )}
                                  </Button>
                                  <Button
                                    onClick={() => deleteRound(round.id)}
                                    variant="destructive"
                                    size="icon"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </div>
                              )}

                              {/* Step 3: Questions (only show when round is saved) */}
                              {round.isSaved && (
                                <div className="mt-6 pt-6 border-t space-y-4">
                                  <div className="flex items-center justify-between">
                                    <h4 className="text-sm font-semibold">Round Questions</h4>
                                    <Button
                                      onClick={() => addQuestion(round.id)}
                                      size="sm"
                                      variant="outline"
                                    >
                                      <Plus className="w-4 h-4 mr-2" />
                                      Add Question
                                    </Button>
                                  </div>

                                  {round.questions.length === 0 ? (
                                    <div className="text-center py-8 border border-dashed rounded-lg">
                                      <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                      <p className="text-sm text-muted-foreground mb-3">
                                        No questions added yet
                                      </p>
                                      <Button
                                        onClick={() => addQuestion(round.id)}
                                        size="sm"
                                        variant="outline"
                                      >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add First Question
                                      </Button>
                                    </div>
                                  ) : (
                                    <div className="space-y-4">
                                      {round.questions.map((question, qIndex) => (
                                        <Card key={question.id} className="border-2">
                                          <CardHeader className="pb-4">
                                            <div className="flex items-center justify-between">
                                              <CardTitle className="text-sm">
                                                Question {qIndex + 1}
                                              </CardTitle>
                                              <Button
                                                onClick={() => deleteQuestion(round.id, question.id)}
                                                variant="ghost"
                                                size="sm"
                                              >
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                              </Button>
                                            </div>
                                          </CardHeader>
                                          <CardContent className="space-y-4">
                                            <div className="space-y-2">
                                              <label className="text-sm font-medium">Question Text *</label>
                                              <Textarea
                                                placeholder="Enter the interview question..."
                                                className="min-h-[80px]"
                                                value={question.question}
                                                onChange={(e) => updateQuestion(round.id, question.id, "question", e.target.value)}
                                              />
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                              <div className="space-y-2">
                                                <label className="text-sm font-medium">Topics</label>
                                                <Input
                                                  placeholder="e.g., Arrays, Dynamic Programming"
                                                  value={question.topics}
                                                  onChange={(e) => updateQuestion(round.id, question.id, "topics", e.target.value)}
                                                />
                                              </div>
                                              <div className="space-y-2">
                                                <label className="text-sm font-medium">Difficulty</label>
                                                <Select
                                                  value={question.difficulty}
                                                  onValueChange={(v) => updateQuestion(round.id, question.id, "difficulty", v)}
                                                >
                                                  <SelectTrigger>
                                                    <SelectValue placeholder="Select difficulty" />
                                                  </SelectTrigger>
                                                  <SelectContent>
                                                    <SelectItem value="easy">Easy</SelectItem>
                                                    <SelectItem value="medium">Medium</SelectItem>
                                                    <SelectItem value="hard">Hard</SelectItem>
                                                  </SelectContent>
                                                </Select>
                                              </div>
                                            </div>

                                            <div className="space-y-2">
                                              <label className="text-sm font-medium">Your Answer</label>
                                              <Textarea
                                                placeholder="How did you answer this question?"
                                                className="min-h-[80px]"
                                                value={question.answer}
                                                onChange={(e) => updateQuestion(round.id, question.id, "answer", e.target.value)}
                                              />
                                            </div>

                                            <div className="space-y-2">
                                              <label className="text-sm font-medium">Feedback</label>
                                              <Textarea
                                                placeholder="Interviewer's feedback or your notes..."
                                                className="min-h-[60px]"
                                                value={question.feedback}
                                                onChange={(e) => updateQuestion(round.id, question.id, "feedback", e.target.value)}
                                              />
                                            </div>

                                            <div className="flex items-center space-x-2 pt-2">
                                              <Checkbox
                                                id={`public-${question.id}`}
                                                checked={question.isPublic}
                                                onCheckedChange={(checked) => 
                                                  updateQuestion(round.id, question.id, "isPublic", checked)
                                                }
                                              />
                                              <label
                                                htmlFor={`public-${question.id}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                              >
                                                Make this question public
                                              </label>
                                            </div>

                                            <Button
                                              onClick={() => saveQuestion(round.id, question.id)}
                                              disabled={isSaving}
                                              className="w-full"
                                              size="sm"
                                            >
                                              {isSaving ? (
                                                <>
                                                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                  Saving...
                                                </>
                                              ) : (
                                                <>
                                                  <Save className="w-4 h-4 mr-2" />
                                                  Save Question
                                                </>
                                              )}
                                            </Button>
                                          </CardContent>
                                        </Card>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Final Step: Review & Submit */}
          {interview.isSaved && rounds.some(r => r.isSaved) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Review & Submit
                  </CardTitle>
                  <CardDescription>
                    Review your interview details and submit when ready
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Summary */}
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-card rounded-lg">
                      <Building2 className="w-5 h-5 text-primary shrink-0 mt-1" />
                      <div className="flex-1">
                        <div className="font-semibold">{interview.company}</div>
                        <div className="text-sm text-muted-foreground">{interview.role}</div>
                        {interview.location && (
                          <div className="text-xs text-muted-foreground mt-1">
                            {interview.location}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-card rounded-lg">
                        <div className="text-2xl font-bold text-primary">{rounds.length}</div>
                        <div className="text-xs text-muted-foreground">Total Rounds</div>
                      </div>
                      <div className="text-center p-4 bg-card rounded-lg">
                        <div className="text-2xl font-bold text-secondary">
                          {rounds.reduce((acc, r) => acc + r.questions.length, 0)}
                        </div>
                        <div className="text-xs text-muted-foreground">Total Questions</div>
                      </div>
                      <div className="text-center p-4 bg-card rounded-lg">
                        <div className="text-2xl font-bold text-accent">
                          {interview.status || "Draft"}
                        </div>
                        <div className="text-xs text-muted-foreground">Status</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setCurrentStep(1)}
                      variant="outline"
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Details
                    </Button>
                    <Button
                      onClick={submitInterview}
                      disabled={isSaving}
                      className="flex-1"
                      size="lg"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Submit Interview
                        </>
                      )}
                    </Button>
                  </div>

                  <p className="text-xs text-center text-muted-foreground">
                    💡 Your progress is auto-saved. You can come back later to complete.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
