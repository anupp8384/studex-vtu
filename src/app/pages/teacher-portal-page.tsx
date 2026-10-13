import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../components/ui/input-otp";
import { Badge } from "../components/ui/badge";
import { Trash2, Eye, Upload, CheckCircle2, Mail } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router";
import logoImage from "../../imports/WhatsApp_Image_2026-05-28_at_5.04.56_PM.jpeg";

// Mock data for teacher's uploads
const teacherUploads = [
  {
    id: "1",
    title: "Operating Systems Model Question Paper 2025",
    subject: "Operating Systems",
    year: "3rd",
    type: "Model QP",
    date: "2026-05-18",
    views: 456,
  },
  {
    id: "2",
    title: "Data Structures - Trees and Graphs PPT",
    subject: "Data Structures",
    year: "2nd",
    type: "PPT",
    date: "2026-05-15",
    views: 189,
  },
  {
    id: "3",
    title: "Machine Learning Reference Material",
    subject: "Machine Learning",
    year: "4th",
    type: "Reference",
    date: "2026-05-10",
    views: 567,
  },
];

export function TeacherPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setOtpSent(true);
      toast.success("OTP sent to your email");
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      setIsLoggedIn(true);
      toast.success("Login successful!");
    }
  };

  const handleDelete = (id: string) => {
    toast.success("Resource deleted successfully");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-secondary/20 to-accent/10 relative overflow-hidden py-16">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <img
                src={logoImage}
                alt="Studex Logo"
                className="h-20 w-auto object-contain"
              />
            </div>
            <h1 className="font-serif text-3xl font-bold text-primary mb-2">
              Teacher Portal
            </h1>
            <p className="text-muted-foreground">
              Upload official materials with verified badge
            </p>
          </div>

          <Card className="p-6">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="teacher@college.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Use your official college email address
                  </p>
                </div>

                <Button type="submit" className="w-full">
                  Send OTP
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Enter the 6-digit OTP sent to
                  </p>
                  <p className="font-medium mb-6">{email}</p>

                  <div className="flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={otp.length !== 6}>
                  Verify & Login
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                  }}
                >
                  Change Email
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary/20 to-accent/10 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="bg-white border-b relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-2">
                Teacher Dashboard
              </h1>
              <p className="text-muted-foreground">Welcome back, {email}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setIsLoggedIn(false);
                setEmail("");
                setOtp("");
                setOtpSent(false);
                toast.success("Logged out successfully");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Uploads</p>
                <p className="text-3xl font-bold text-primary">{teacherUploads.length}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Views</p>
                <p className="text-3xl font-bold text-primary">
                  {teacherUploads.reduce((sum, item) => sum + item.views, 0)}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Eye className="h-6 w-6 text-accent" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Average Views</p>
                <p className="text-3xl font-bold text-primary">
                  {Math.round(
                    teacherUploads.reduce((sum, item) => sum + item.views, 0) /
                      teacherUploads.length
                  )}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Upload New Resource Button */}
        <div className="mb-6">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
            <Link to="/upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload New Resource
            </Link>
          </Button>
        </div>

        {/* My Uploads Table */}
        <Card>
          <div className="p-6 border-b">
            <h2 className="font-serif text-2xl font-semibold">My Uploads</h2>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teacherUploads.map((upload) => (
                  <TableRow key={upload.id}>
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate">{upload.title}</div>
                    </TableCell>
                    <TableCell>{upload.subject}</TableCell>
                    <TableCell>{upload.year} Year</TableCell>
                    <TableCell>
                      <Badge variant="outline">{upload.type}</Badge>
                    </TableCell>
                    <TableCell>{new Date(upload.date).toLocaleDateString()}</TableCell>
                    <TableCell>{upload.views}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(upload.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
}
