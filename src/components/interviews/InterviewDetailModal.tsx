import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  DollarSign,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Target,
  Brain,
  Sparkles
} from "lucide-react";
import { DetailedInterview, InterviewRound } from "@/data/dummyData";

interface InterviewDetailModalProps {
  interview: DetailedInterview | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusConfig = {
  offer: { label: "Offer", color: "bg-success text-success-foreground", icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "bg-error text-error-foreground", icon: XCircle },
  pending: { label: "Pending", color: "bg-warning text-warning-foreground", icon: Clock },
  interviewing: { label: "Interviewing", color: "bg-info text-info-foreground", icon: AlertCircle }
};

const roundTypeColors = {
  coding: "bg-blue-500",
  'system-design': "bg-purple-500", 
  behavioral: "bg-green-500",
  cultural: "bg-orange-500",
  technical: "bg-red-500"
};

const difficultyColors = {
  easy: "bg-success text-success-foreground",
  medium: "bg-warning text-warning-foreground", 
  hard: "bg-error text-error-foreground"
};

export function InterviewDetailModal({ interview, isOpen, onClose }: InterviewDetailModalProps) {
  const [activeTab, setActiveTab] = useState("overview");

  if (!interview) return null;

  const statusInfo = statusConfig[interview.status as keyof typeof statusConfig];
  const completedRounds = interview.rounds.filter(r => r.status === 'completed').length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-xl font-bold">{interview.company}</div>
              <div className="text-sm text-muted-foreground font-normal">{interview.role}</div>
            </div>
            <Badge className={statusInfo.color}>
              <statusInfo.icon className="w-3 h-3 mr-1" />
              {statusInfo.label}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rounds">Rounds ({completedRounds})</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Key Details */}
            <Card className="p-6 gradient-card border-0">
              <h3 className="text-lg font-semibold mb-4">Interview Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Date: </span>
                    {new Date(interview.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Location: </span>
                    {interview.location}
                  </span>
                </div>
                {interview.salary && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-medium">Salary: </span>
                      {interview.salary}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Progress: </span>
                    {completedRounds}/{interview.rounds.length} rounds
                  </span>
                </div>
              </div>
            </Card>

            {/* HR Contact */}
            {interview.hrContact && (
              <Card className="p-6 gradient-card border-0">
                <h3 className="text-lg font-semibold mb-4">HR Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{interview.hrContact.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{interview.hrContact.email}</span>
                  </div>
                  {interview.hrContact.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{interview.hrContact.phone}</span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Overall Status */}
            <Card className="p-6 gradient-card border-0">
              <h3 className="text-lg font-semibold mb-4">Overall Status</h3>
              <p className="text-sm text-muted-foreground mb-4">{interview.overallStatus}</p>
              {interview.nextSteps && (
                <div>
                  <h4 className="font-medium mb-2">Next Steps:</h4>
                  <p className="text-sm text-muted-foreground">{interview.nextSteps}</p>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="rounds" className="space-y-4 mt-6">
            {interview.rounds.map((round, index) => (
              <motion.div
                key={round.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 gradient-card border-0">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${roundTypeColors[round.type]} rounded-lg flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{round.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{round.type.replace('-', ' ')}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={round.status === 'completed' ? 'default' : 'secondary'}
                      className="capitalize"
                    >
                      {round.status}
                    </Badge>
                  </div>

                  {round.status === 'completed' && (
                    <>
                      <div className="grid gap-4 md:grid-cols-2 mb-4">
                        {round.date && (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            {new Date(round.date).toLocaleDateString()}
                          </div>
                        )}
                        {round.duration && (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            {round.duration}
                          </div>
                        )}
                        {round.interviewer && (
                          <div className="flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-muted-foreground" />
                            {round.interviewer}
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm">
                          <Brain className="w-4 h-4 text-muted-foreground" />
                          Confidence: {round.confidence}%
                        </div>
                      </div>

                      {round.personalExperience && (
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Your Experience:</h4>
                          <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                            {round.personalExperience}
                          </p>
                        </div>
                      )}

                      {round.feedback && (
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Interviewer Feedback:</h4>
                          <p className="text-sm text-muted-foreground bg-success/5 border border-success/20 p-3 rounded-lg">
                            {round.feedback}
                          </p>
                        </div>
                      )}

                      {round.questions.length > 0 && (
                        <div>
                          <h4 className="font-medium mb-3">Questions Asked ({round.questions.length}):</h4>
                          <div className="space-y-3">
                            {round.questions.map((question) => (
                              <div key={question.id} className="p-3 bg-muted rounded-lg">
                                <div className="flex items-start justify-between mb-2">
                                  <p className="text-sm font-medium flex-1">{question.question}</p>
                                  <Badge className={difficultyColors[question.difficulty]}>
                                    {question.difficulty}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-2">
                                  {question.topics.map((topic) => (
                                    <Badge key={topic} variant="secondary" className="text-xs">
                                      {topic}
                                    </Badge>
                                  ))}
                                </div>
                                {question.yourAnswer && (
                                  <p className="text-xs text-muted-foreground">
                                    <span className="font-medium">Your approach: </span>
                                    {question.yourAnswer}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {round.status === 'scheduled' && round.date && (
                    <div className="text-sm text-muted-foreground">
                      Scheduled for {new Date(round.date).toLocaleDateString()} 
                      {round.duration && ` • ${round.duration}`}
                      {round.interviewer && ` • ${round.interviewer}`}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="questions" className="space-y-4 mt-6">
            {interview.rounds
              .filter(round => round.questions.length > 0)
              .map((round) => (
                <Card key={round.id} className="p-6 gradient-card border-0">
                  <h3 className="text-lg font-semibold mb-4">{round.name}</h3>
                  <div className="space-y-4">
                    {round.questions.map((question) => (
                      <div key={question.id} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="font-medium flex-1">{question.question}</h4>
                          <div className="flex gap-2">
                            <Badge className={difficultyColors[question.difficulty]}>
                              {question.difficulty}
                            </Badge>
                            {question.isPublic && (
                              <Badge variant="outline">Public</Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {question.topics.map((topic) => (
                            <Badge key={topic} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>

                        {question.yourAnswer && (
                          <div className="mb-3">
                            <p className="text-sm font-medium mb-1">Your Approach:</p>
                            <p className="text-sm text-muted-foreground">{question.yourAnswer}</p>
                          </div>
                        )}

                        {question.feedback && (
                          <div>
                            <p className="text-sm font-medium mb-1">Feedback:</p>
                            <p className="text-sm text-success">{question.feedback}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6 mt-6">
            <Card className="p-6 gradient-card border-0">
              <h3 className="text-lg font-semibold mb-4">Overall Feedback</h3>
              <p className="text-sm text-muted-foreground mb-6">{interview.overallFeedback}</p>
              
              <Button className="gap-2">
                <Sparkles className="w-4 h-4" />
                Get AI Suggestions for Improvement
              </Button>
            </Card>

            {/* Round-wise feedback summary */}
            <Card className="p-6 gradient-card border-0">
              <h3 className="text-lg font-semibold mb-4">Round-wise Performance</h3>
              <div className="space-y-4">
                {interview.rounds
                  .filter(round => round.status === 'completed' && round.feedback)
                  .map((round) => (
                    <div key={round.id} className="flex items-start gap-3">
                      <div className={`w-6 h-6 ${roundTypeColors[round.type]} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <span className="text-white text-xs font-bold">
                          {interview.rounds.indexOf(round) + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{round.name}</h4>
                        <p className="text-sm text-muted-foreground">{round.feedback}</p>
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Confidence:</span>
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full"
                                style={{ width: `${round.confidence}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium">{round.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}