import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  Filter,
  Building2,
  Calendar,
  TrendingUp,
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";

const mockInterviews = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer",
    date: "2024-01-15",
    status: "offer",
    rounds: { completed: 4, total: 4 },
    confidence: 85,
    tags: ["System Design", "Algorithms", "Behavioral"]
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Senior SDE",
    date: "2024-01-10",
    status: "rejected",
    rounds: { completed: 3, total: 4 },
    confidence: 70,
    tags: ["Coding", "System Design"]
  },
  {
    id: 3,
    company: "Amazon",
    role: "Principal Engineer",
    date: "2024-01-08",
    status: "pending",
    rounds: { completed: 2, total: 5 },
    confidence: 78,
    tags: ["Leadership", "System Design", "Behavioral"]
  },
  {
    id: 4,
    company: "Meta",
    role: "Staff Engineer",
    date: "2024-01-05",
    status: "interviewing",
    rounds: { completed: 1, total: 4 },
    confidence: 82,
    tags: ["Product Design", "Algorithms"]
  }
];

const statusConfig = {
  offer: { label: "Offer", color: "bg-success text-success-foreground", icon: CheckCircle2 },
  rejected: { label: "Rejected", color: "bg-error text-error-foreground", icon: XCircle },
  pending: { label: "Pending", color: "bg-warning text-warning-foreground", icon: Clock },
  interviewing: { label: "Interviewing", color: "bg-info text-info-foreground", icon: AlertCircle }
};

export function InterviewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredInterviews = mockInterviews.filter(interview => {
    const matchesSearch = interview.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interview.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || interview.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
          Interview Tracker
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-muted-foreground"
        >
          Track your interview progress and identify improvement opportunities
        </motion.p>
      </div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid gap-6 md:grid-cols-4 mb-8"
      >
        <Card className="p-6 gradient-card border-0 shadow-md hover:shadow-glow transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Total Interviews</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 gradient-card border-0 shadow-md hover:shadow-glow transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">Offers</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 gradient-card border-0 shadow-md hover:shadow-glow transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <div className="text-2xl font-bold">78%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </Card>

        <Card className="p-6 gradient-card border-0 shadow-md hover:shadow-glow transition-all">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="text-2xl font-bold">2</div>
              <div className="text-sm text-muted-foreground">Pending</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 mb-8"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search companies or roles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="offer">Offer</SelectItem>
            <SelectItem value="interviewing">Interviewing</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Interview
        </Button>
      </motion.div>

      {/* Interview Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredInterviews.map((interview, index) => {
          const statusInfo = statusConfig[interview.status as keyof typeof statusConfig];
          
          return (
            <motion.div
              key={interview.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
            >
              <Card className="p-6 gradient-card border-0 shadow-md hover:shadow-glow transition-all duration-300 group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {interview.company}
                      </h3>
                      <p className="text-sm text-muted-foreground">{interview.role}</p>
                    </div>
                  </div>
                  
                  <Badge className={statusInfo.color}>
                    <statusInfo.icon className="w-3 h-3 mr-1" />
                    {statusInfo.label}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {new Date(interview.date).toLocaleDateString()}
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Interview Rounds</span>
                    <span className="text-sm text-muted-foreground">
                      {interview.rounds.completed}/{interview.rounds.total}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(interview.rounds.completed / interview.rounds.total) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Confidence Score */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Confidence</span>
                    <span className="text-sm text-muted-foreground">{interview.confidence}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-secondary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${interview.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {interview.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredInterviews.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center py-12"
        >
          <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No interviews found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || statusFilter !== "all" 
              ? "Try adjusting your filters" 
              : "Start tracking your interview journey"}
          </p>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Your First Interview
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}