import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { FileQuestion } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary/20 to-accent/10 relative overflow-hidden flex items-center justify-center px-4">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="text-center relative z-10">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-secondary mb-6">
          <FileQuestion className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-4">
          404
        </h1>
        <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/browse">Browse Resources</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
