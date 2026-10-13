import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Download, Star, FileText, Calendar, User } from "lucide-react";
import { toast } from "sonner";
import { usePoints } from "../context/points-context";
import { useAuth } from "../context/auth-context";

export interface Resource {
  id: string;
  title: string;
  subject: string;
  department: string;
  year: string;
  section: string;
  type: string;
  uploadedBy: string;
  date: string;
  rating: number;
}

interface ResourceCardProps {
  resource: Resource;
  downloads: number;
  onDownload: () => void;
}

export function ResourceCard({ resource, downloads, onDownload }: ResourceCardProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const { rateResource, getRatingInfo } = usePoints();
  const { user, accountStatus } = useAuth();
  const navigate = useNavigate();

  const { avg, count, userRating } = getRatingInfo(resource.id, resource.rating);

  const handleDownload = () => {
    onDownload();
    toast.success(`Downloading "${resource.title}"`);
  };

  const handleRate = (stars: number) => {
    // Require approved account to rate
    if (!user) { navigate("/login"); return; }
    if (accountStatus !== "approved") {
      const dest = accountStatus === "none" ? "/register"
                 : accountStatus === "pending" ? "/pending" : "/rejected";
      navigate(dest);
      return;
    }
    const isNew = userRating === null;
    rateResource(resource.id, resource.title, stars);

    const out10 = (stars / 5) * 10;
    if (out10 >= 7) {
      toast.success(`+10 Bonus Points! "${resource.title}" got a 7+ rating 🎉`, { duration: 3500 });
    } else {
      toast.success(isNew ? `You rated this ${stars}★` : `Rating updated to ${stars}★`);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Notes":       return "bg-blue-100 text-blue-700 border-blue-200";
      case "Model QP":    return "bg-purple-100 text-purple-700 border-purple-200";
      case "PPT":         return "bg-green-100 text-green-700 border-green-200";
      case "Reference":   return "bg-orange-100 text-orange-700 border-orange-200";
      default:            return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const displayStars = hovered ?? userRating ?? 0;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-[#ADD8E6]">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-[#ADD8E6]/30 flex items-center justify-center flex-shrink-0">
          <FileText className="h-6 w-6 text-slate-500" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2 text-slate-800">{resource.title}</h3>
          <p className="text-sm text-muted-foreground">{resource.subject}</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={getTypeColor(resource.type)}>
            {resource.type}
          </Badge>
          <Badge variant="outline">
            {resource.department} - {resource.year} Year
          </Badge>
          <Badge variant="outline">Section {resource.section}</Badge>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-3.5 w-3.5" />
            <span>
              {resource.uploadedBy}
              {resource.uploadedBy === "Teacher" && (
                <Badge variant="secondary" className="ml-2 text-xs bg-[#ADD8E6]/20 text-slate-600 border-[#ADD8E6]/40">
                  Verified
                </Badge>
              )}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{new Date(resource.date).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Average rating display */}
        <div className="flex items-center gap-2 text-sm">
          <Star className="h-4 w-4 fill-[#FFBF00] text-[#FFBF00]" />
          <span className="font-semibold text-slate-800">{avg.toFixed(1)}</span>
          <span className="text-muted-foreground">({count} ratings)</span>
          <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
            <Download className="h-3.5 w-3.5" />{downloads === 0 ? "00" : downloads}
          </span>
        </div>

        {/* Interactive star row */}
        <div className="flex flex-col gap-1">
          <p className="text-xs text-muted-foreground">
            {!user
              ? "Sign in to rate this resource"
              : userRating
              ? `Your rating: ${userRating}★ — click to change`
              : "Rate this resource:"}
          </p>
          <div
            className="flex items-center gap-0.5"
            onMouseLeave={() => setHovered(null)}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRate(star)}
                onMouseEnter={() => setHovered(star)}
                className="p-0.5 focus:outline-none transition-transform hover:scale-110"
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                <Star
                  className={`h-5 w-5 transition-colors ${
                    star <= displayStars
                      ? "fill-[#FFBF00] text-[#FFBF00]"
                      : "fill-none text-slate-300"
                  }`}
                />
              </button>
            ))}
            {userRating && (
              <span className="ml-2 text-xs text-[#FFBF00] font-medium">★ Rated</span>
            )}
          </div>
        </div>
      </div>

      <Button
        onClick={handleDownload}
        className="w-full bg-[#FFBF00] hover:bg-[#FFBF00]/90 text-slate-900 font-semibold"
      >
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
    </Card>
  );
}
