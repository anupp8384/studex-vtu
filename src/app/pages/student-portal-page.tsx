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
import { Badge } from "../components/ui/badge";
import { Trash2, Eye, Upload, BookOpen, Mail, Lock, UserCircle, Star } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router";
import logoImage from "../../imports/WhatsApp_Image_2026-05-28_at_5.04.56_PM.jpeg";
import { CoinIcon } from "../components/coin-icon";
import { usePoints } from "../context/points-context";

const studentUploads: {
  id: string; title: string; subject: string; year: string;
  type: string; date: string; views: number;
}[] = [];

export function StudentPortalPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const { totalPoints, history, addRatingBonus } = usePoints();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
      toast.success("Login successful!");
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password && name) {
      setIsLoggedIn(true);
      toast.success("Account created successfully!");
    }
  };

  const handleDelete = (_id: string) => {
    toast.success("Resource deleted successfully");
  };

  const handleSimulateRating = () => {
    addRatingBonus("Computer Networks Unit 3 Notes");
    toast.success("+10 Bonus Points! Your notes got a 7+ rating 🎉");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FBFAF5] py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <img src={logoImage} alt="Studex Logo" className="h-20 w-auto object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-[#FFBF00] mb-2">Student Portal</h1>
            <p className="text-slate-500">Access and manage your uploaded resources</p>
          </div>

          <Card className="p-6 border-[#ADD8E6]">
            <div className="flex gap-2 mb-6">
              <Button
                variant={!isSignUp ? "default" : "outline"}
                className={`flex-1 ${!isSignUp ? "bg-[#FFBF00] text-slate-900" : ""}`}
                onClick={() => setIsSignUp(false)}
              >
                Login
              </Button>
              <Button
                variant={isSignUp ? "default" : "outline"}
                className={`flex-1 ${isSignUp ? "bg-[#FFBF00] text-slate-900" : ""}`}
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </Button>
            </div>

            {!isSignUp ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="student@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-10" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required className="pl-10" />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-[#FFBF00] hover:bg-[#FFBF00]/90 text-slate-900">Login</Button>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative mt-2">
                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="name" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required className="pl-10" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="signup-email">Email Address</Label>
                  <div className="relative mt-2">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-email" type="email" placeholder="student@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-10" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="signup-password" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required className="pl-10" />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-[#FFBF00] hover:bg-[#FFBF00]/90 text-slate-900">Create Account</Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFAF5]">
      {/* Dashboard header */}
      <div className="bg-white border-b border-[#ADD8E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#FFBF00] mb-1">Student Dashboard</h1>
              <p className="text-slate-500">Welcome back, {email}</p>
            </div>
            <Button
              variant="outline"
              className="border-[#ADD8E6]"
              onClick={() => {
                setIsLoggedIn(false);
                setEmail("");
                setPassword("");
                setName("");
                toast.success("Logged out successfully");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── Studex Points card ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Big points card */}
          <Card className="lg:col-span-1 p-6 border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-sm">
            <div className="flex flex-col items-center text-center gap-3">
              <CoinIcon size="xl" />
              <div>
                <p className="text-xs font-medium text-amber-600 uppercase tracking-widest mb-1">Studex Points</p>
                <p className="text-5xl font-bold text-[#FFBF00]">{totalPoints === 0 ? "00" : totalPoints}</p>
              </div>
              <p className="text-xs text-slate-400">Earn 40 pts per upload · 10 bonus for 7+ rating</p>
              {/* Demo button to simulate a rating bonus */}
              <button
                onClick={handleSimulateRating}
                className="mt-1 text-xs text-amber-700 underline underline-offset-2 hover:text-amber-900"
              >
                Simulate 7+ rating bonus →
              </button>
            </div>
          </Card>

          {/* Stats cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="p-6 border-[#ADD8E6]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">My Uploads</p>
                  <p className="text-3xl font-bold text-[#FFBF00]">{studentUploads.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#ADD8E6]/40 flex items-center justify-center">
                  <Upload className="h-6 w-6 text-slate-500" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-[#ADD8E6]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Total Views</p>
                  <p className="text-3xl font-bold text-[#FFBF00]">
                    {studentUploads.reduce((sum, item) => sum + item.views, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#ADD8E6]/40 flex items-center justify-center">
                  <Eye className="h-6 w-6 text-slate-500" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-[#ADD8E6]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Resources Shared</p>
                  <p className="text-3xl font-bold text-[#FFBF00]">{studentUploads.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#ADD8E6]/40 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-slate-500" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* ── Points History ── */}
        <Card className="border-[#ADD8E6]">
          <div className="p-5 border-b border-[#ADD8E6] flex items-center gap-2">
            <CoinIcon size="sm" />
            <h2 className="text-lg font-semibold text-[#FFBF00]">Points History</h2>
          </div>
          <div className="divide-y divide-[#ADD8E6]/50">
            {history.map((event) => (
              <div key={event.id} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${event.type === "rating_bonus" ? "bg-amber-100" : "bg-[#ADD8E6]/40"}`}>
                    {event.type === "rating_bonus" ? (
                      <Star className="h-3.5 w-3.5 text-amber-500" />
                    ) : (
                      <Upload className="h-3.5 w-3.5 text-slate-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{event.label}</p>
                    <p className="text-xs text-slate-400">{new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-amber-700">+{event.points}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* ── Upload button ── */}
        <div>
          <Button asChild size="lg" className="bg-[#FFBF00] hover:bg-[#FFBF00]/90 text-slate-900">
            <Link to="/upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload New Resource
            </Link>
          </Button>
        </div>

        {/* ── My Uploads Table ── */}
        <Card className="border-[#ADD8E6]">
          <div className="p-6 border-b border-[#ADD8E6]">
            <h2 className="text-xl font-semibold text-[#FFBF00]">My Uploads</h2>
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
                {studentUploads.map((upload) => (
                  <TableRow key={upload.id}>
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate">{upload.title}</div>
                    </TableCell>
                    <TableCell>{upload.subject}</TableCell>
                    <TableCell>{upload.year} Year</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-[#ADD8E6] text-slate-600">{upload.type}</Badge>
                    </TableCell>
                    <TableCell>{new Date(upload.date).toLocaleDateString()}</TableCell>
                    <TableCell>{upload.views}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(upload.id)}>
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
