import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Upload, Search, Award } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import studentsPhoto from "../../imports/multiethnic-group-young-happy-students-standing-outdoors.jpg";

export function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section — full-bleed photo background */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        {/* Background photo */}
        <ImageWithFallback
          src={studentsPhoto}
          alt="Happy students holding books outdoors"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/10" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Every Note. Every Branch.{" "}
              <span className="text-[#FFBF00]">One Place.</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white/80">
              Access model question papers, class notes, and teacher material — organized by
              department, year, and subject.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#FFBF00] hover:bg-[#FFBF00]/90 text-slate-900 font-semibold"
              >
                <Link to="/browse">Browse Notes</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-slate-900 hover:bg-white/90 font-semibold"
              >
                <Link to="/upload">Upload Resource</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* How It Works Section — #ADD8E6 stronger tint */}
      <section className="py-16 md:py-24 bg-[#ADD8E6]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              How It{" "}
              <span className="text-[#FFBF00]">Works</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Share your knowledge and access resources in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center border-[#ADD8E6] hover:border-[#ADD8E6] hover:shadow-md transition-all bg-white">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ADD8E6]/60 mb-6">
                <Upload className="h-8 w-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Upload your notes or QP photo</h3>
              <p className="text-slate-500">
                Take a photo of your notes or upload your question papers in any format
              </p>
            </Card>

            <Card className="p-8 text-center border-[#ADD8E6] hover:shadow-md transition-all bg-white">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ADD8E6]/60 mb-6">
                <Award className="h-8 w-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Tag it — Branch, Year, Subject</h3>
              <p className="text-slate-500">
                Add relevant tags so students can easily find your resource
              </p>
            </Card>

            <Card className="p-8 text-center border-[#ADD8E6] hover:shadow-md transition-all bg-white">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ADD8E6]/60 mb-6">
                <Search className="h-8 w-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Anyone in college can access it instantly</h3>
              <p className="text-slate-500">
                Your contribution helps fellow students succeed in their studies
              </p>
            </Card>
          </div>
        </div>
      </section>

    </div>
  );
}
