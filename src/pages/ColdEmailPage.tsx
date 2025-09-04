import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Copy,
  Send,
  RefreshCw,
  Save,
  Zap,
  CheckCircle2,
  TrendingUp,
  Users
} from "lucide-react";

const emailTemplates = [
  {
    id: 1,
    name: "Software Engineer",
    subject: "Passionate Software Engineer - {Company} Opportunities",
    performance: "High",
    responseRate: "24%"
  },
  {
    id: 2,
    name: "Product Manager",
    subject: "Product Strategy Discussion - {Company}",
    performance: "Medium",
    responseRate: "18%"
  },
  {
    id: 3,
    name: "Data Scientist",
    subject: "ML/Data Science Expertise for {Company}",
    performance: "High", 
    responseRate: "22%"
  }
];

const mockGeneratedEmail = {
  subject: "Passionate Software Engineer - Google Opportunities",
  body: `Hi Sarah,

I hope this email finds you well! I'm John Smith, a software engineer with 5 years of experience in full-stack development and a passion for building scalable systems.

I've been following Google's innovative work in cloud computing and AI, particularly your recent advances in machine learning infrastructure. Your team's commitment to solving complex technical challenges at scale really resonates with my career goals.

In my current role at TechCorp, I've:
• Led the development of microservices handling 10M+ daily requests
• Reduced infrastructure costs by 35% through cloud optimization
• Mentored a team of 6 junior developers

I'd love to learn more about software engineering opportunities at Google, particularly in your Cloud Platform team. Would you be open to a brief 15-minute conversation about potential openings?

I've attached my resume for your review. Thank you for your time, and I look forward to hearing from you!

Best regards,
John Smith
john.smith@email.com
(555) 123-4567
LinkedIn: linkedin.com/in/johnsmith`
};

export function ColdEmailPage() {
  const [formData, setFormData] = useState({
    recruiterName: "",
    recruiterEmail: "",
    company: "",
    role: "",
    tone: "professional",
    customMessage: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResult(true);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
          Cold Email Generator
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-muted-foreground"
        >
          Craft personalized, professional emails to recruiters with AI assistance
        </motion.p>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid gap-6 md:grid-cols-3 mb-8"
      >
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-sm text-muted-foreground">Emails Generated</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold">23%</div>
              <div className="text-sm text-muted-foreground">Avg Response Rate</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <div className="text-2xl font-bold">89</div>
              <div className="text-sm text-muted-foreground">Connections Made</div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6">Email Details</h2>
            
            <div className="space-y-6">
              {/* Template Selection */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Choose Template</Label>
                <div className="grid gap-3">
                  {emailTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedTemplate === template.name 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedTemplate(template.name)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{template.name}</div>
                          <div className="text-xs text-muted-foreground">{template.subject}</div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={template.performance === 'High' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {template.responseRate}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="recruiterName">Recruiter Name</Label>
                  <Input
                    id="recruiterName"
                    placeholder="Sarah Johnson"
                    value={formData.recruiterName}
                    onChange={(e) => handleInputChange('recruiterName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="recruiterEmail">Recruiter Email</Label>
                  <Input
                    id="recruiterEmail"
                    type="email"
                    placeholder="sarah@company.com"
                    value={formData.recruiterEmail}
                    onChange={(e) => handleInputChange('recruiterEmail', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    placeholder="Google"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Target Role</Label>
                  <Input
                    id="role"
                    placeholder="Software Engineer"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tone">Email Tone</Label>
                <Select value={formData.tone} onValueChange={(value) => handleInputChange('tone', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="direct">Direct</SelectItem>
                    <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="customMessage">Additional Information (Optional)</Label>
                <Textarea
                  id="customMessage"
                  placeholder="Any specific achievements or details you want to highlight..."
                  value={formData.customMessage}
                  onChange={(e) => handleInputChange('customMessage', e.target.value)}
                  className="min-h-20"
                />
              </div>

              <Button 
                onClick={handleGenerate}
                disabled={!formData.recruiterName || !formData.company || isGenerating}
                className="w-full gap-2"
              >
                {isGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-4 h-4" />
                    </motion.div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    Generate Email
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Generated Email */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {showResult ? (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Generated Email</h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(`${mockGeneratedEmail.subject}\n\n${mockGeneratedEmail.body}`)}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleGenerate}
                    className="gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Subject</Label>
                  <div className="mt-1 p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">{mockGeneratedEmail.subject}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Email Body</Label>
                  <div className="mt-1 p-4 bg-muted rounded-lg">
                    <pre className="text-sm whitespace-pre-wrap font-sans">
                      {mockGeneratedEmail.body}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button className="gap-2">
                  <Send className="w-4 h-4" />
                  Send Email
                </Button>
                <Button variant="outline" className="gap-2">
                  <Save className="w-4 h-4" />
                  Save Template
                </Button>
              </div>

              <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium text-success">Email Quality Score: 92%</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Excellent personalization and professional tone. High probability of response.
                </p>
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <Mail className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ready to Generate</h3>
              <p className="text-muted-foreground">
                Fill in the details to generate a personalized cold email
              </p>
            </Card>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}