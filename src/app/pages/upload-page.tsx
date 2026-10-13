import { useState } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/auth-context";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card } from "../components/ui/card";
import { Upload, FileText, CheckCircle2, X, Star } from "lucide-react";
import { CoinIcon } from "../components/coin-icon";
import { usePoints } from "../context/points-context";

function UploadForm() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploaderType, setUploaderType] = useState<"student" | "teacher">("student");
  const [showSuccess, setShowSuccess] = useState(false);
  const { addUploadPoints } = usePoints();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUploadPoints();
    setShowSuccess(true);
    setUploadedFiles([]);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-[#FBFAF5] py-8 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#FFBF00] mb-1">
            Upload Resource
          </h1>
          <p className="text-slate-500">Share your notes and help fellow students succeed</p>
        </div>

        {/* Points hint banner */}
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6">
          <CoinIcon size="md" />
          <div>
            <p className="text-sm font-semibold text-amber-800">Earn 40 Studex Points per upload</p>
            <p className="text-xs text-amber-600">Get a 7+ rating on your notes to earn 10 bonus points</p>
          </div>
        </div>

        <Card className="p-6 md:p-8 border-[#ADD8E6]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Resource Title */}
            <div>
              <Label htmlFor="title">Resource Title *</Label>
              <Input
                id="title"
                placeholder="e.g., DBMS Complete Notes - Unit 1 to 5"
                required
                className="mt-2"
              />
            </div>

            {/* Resource Type */}
            <div>
              <Label htmlFor="type">Resource Type *</Label>
              <Select required>
                <SelectTrigger id="type" className="mt-2">
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="notes">Notes</SelectItem>
                  <SelectItem value="model-qp">Model Question Paper</SelectItem>
                  <SelectItem value="ppt">PPT / Presentation</SelectItem>
                  <SelectItem value="reference">Reference Material</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Department */}
            <div>
              <Label htmlFor="department">Department *</Label>
              <Select required>
                <SelectTrigger id="department" className="mt-2">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CSE">Computer Science & Engineering</SelectItem>
                  <SelectItem value="ISE">Information Science & Engineering</SelectItem>
                  <SelectItem value="ECE">Electronics & Communication</SelectItem>
                  <SelectItem value="ME">Mechanical Engineering</SelectItem>
                  <SelectItem value="Civil">Civil Engineering</SelectItem>
                  <SelectItem value="EEE">Electrical & Electronics</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Year and Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="year">Year *</Label>
                <Select required>
                  <SelectTrigger id="year" className="mt-2">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st Year</SelectItem>
                    <SelectItem value="2nd">2nd Year</SelectItem>
                    <SelectItem value="3rd">3rd Year</SelectItem>
                    <SelectItem value="4th">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="section">Section *</Label>
                <Select required>
                  <SelectTrigger id="section" className="mt-2">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">Section A</SelectItem>
                    <SelectItem value="B">Section B</SelectItem>
                    <SelectItem value="C">Section C</SelectItem>
                    <SelectItem value="D">Section D</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Subject Name */}
            <div>
              <Label htmlFor="subject">Subject Name *</Label>
              <Input
                id="subject"
                placeholder="e.g., Database Management Systems"
                required
                className="mt-2"
              />
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add any additional details about this resource..."
                rows={4}
                className="mt-2"
              />
            </div>

            {/* Uploader Type */}
            <div>
              <Label>Uploaded By *</Label>
              <div className="flex gap-4 mt-2">
                <Button
                  type="button"
                  variant={uploaderType === "student" ? "default" : "outline"}
                  onClick={() => setUploaderType("student")}
                  className={`flex-1 ${uploaderType === "student" ? "bg-[#FFBF00] text-slate-900" : ""}`}
                >
                  Student
                </Button>
                <Button
                  type="button"
                  variant={uploaderType === "teacher" ? "default" : "outline"}
                  onClick={() => setUploaderType("teacher")}
                  className={`flex-1 ${uploaderType === "teacher" ? "bg-[#FFBF00] text-slate-900" : ""}`}
                >
                  Teacher
                </Button>
              </div>
            </div>

            {/* File Upload Zone */}
            <div>
              <Label>Upload Files *</Label>
              <div
                className={`mt-2 border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  isDragging
                    ? "border-[#ADD8E6] bg-[#ADD8E6]/10"
                    : "border-[#ADD8E6] hover:border-[#ADD8E6]/70"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#ADD8E6]/40 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-slate-500" />
                  </div>
                  <div>
                    <p className="font-medium mb-1 text-slate-700">Drag & drop your files here</p>
                    <p className="text-sm text-slate-400 mb-4">or click to browse</p>
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.ppt,.pptx"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="border-[#ADD8E6]"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      Browse Files
                    </Button>
                  </div>
                  <p className="text-xs text-slate-400">
                    Supports: JPG, PNG, PDF, PPT (Max 10MB per file)
                  </p>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-[#ADD8E6]/15 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-slate-500" />
                        <div>
                          <p className="text-sm font-medium text-slate-700">{file.name}</p>
                          <p className="text-xs text-slate-400">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Note */}
            <div className="bg-[#ADD8E6]/20 border border-[#ADD8E6] rounded-lg p-4">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-600">
                  All uploads are reviewed before going live. Please ensure your resource is
                  relevant and helpful to fellow students.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" size="lg" className="w-full bg-[#FFBF00] hover:bg-[#FFBF00]/90 text-slate-900">
              <Upload className="h-4 w-4 mr-2" />
              Upload Resource
            </Button>
          </form>
        </Card>
      </div>

      {/* Upload Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowSuccess(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Coin */}
            <div className="flex justify-center mb-4">
              <CoinIcon size="xl" />
            </div>

            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 mb-3">
              <span className="text-amber-700 font-bold text-lg">+40 Studex Points earned!</span>
            </div>

            <h2 className="text-xl font-bold text-[#FFBF00] mb-2">Upload Successful</h2>
            <p className="text-slate-500 text-sm mb-5">
              Your resource is under review and will go live shortly.
            </p>

            {/* Bonus hint */}
            <div className="flex items-center gap-2 bg-[#ADD8E6]/25 border border-[#ADD8E6] rounded-xl p-3 text-left">
              <Star className="h-4 w-4 text-amber-500 flex-shrink-0" />
              <p className="text-xs text-slate-600">
                <span className="font-semibold text-[#FFBF00]">Get a 7+ rating</span> on your notes
                to earn <span className="font-semibold text-amber-700">10 more bonus points</span>
              </p>
            </div>

            <Button
              onClick={() => setShowSuccess(false)}
              className="w-full mt-5 bg-[#FFBF00] hover:bg-[#FFBF00]/90 text-slate-900"
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function UploadPage() {
  const { user, accountStatus } = useAuth();
  if (!user)                        return <Navigate to="/login"    replace />;
  if (accountStatus === "none")     return <Navigate to="/register" replace />;
  if (accountStatus === "pending")  return <Navigate to="/pending"  replace />;
  if (accountStatus === "rejected") return <Navigate to="/rejected" replace />;
  return <UploadForm />;
}
