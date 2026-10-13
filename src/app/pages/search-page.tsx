import { useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ResourceCard } from "../components/resource-card";
import { Search, X, FileQuestion } from "lucide-react";

// Mock data
const mockResources = [
  {
    id: "1",
    title: "DBMS Complete Notes - Unit 1 to 5",
    subject: "Database Management Systems",
    department: "CSE",
    year: "3rd",
    section: "A",
    type: "Notes",
    uploadedBy: "Student",
    date: "2026-05-20",
    rating: 4.5,
    downloads: 234,
  },
  {
    id: "2",
    title: "Operating Systems Model Question Paper 2025",
    subject: "Operating Systems",
    department: "CSE",
    year: "3rd",
    section: "B",
    type: "Model QP",
    uploadedBy: "Teacher",
    date: "2026-05-18",
    rating: 5,
    downloads: 456,
  },
  {
    id: "3",
    title: "Data Structures - Trees and Graphs PPT",
    subject: "Data Structures",
    department: "ISE",
    year: "2nd",
    section: "A",
    type: "PPT",
    uploadedBy: "Teacher",
    date: "2026-05-15",
    rating: 4.8,
    downloads: 189,
  },
  {
    id: "4",
    title: "Computer Networks - TCP/IP Notes",
    subject: "Computer Networks",
    department: "CSE",
    year: "4th",
    section: "C",
    type: "Notes",
    uploadedBy: "Student",
    date: "2026-05-12",
    rating: 4.2,
    downloads: 321,
  },
  {
    id: "5",
    title: "Machine Learning Reference Material",
    subject: "Machine Learning",
    department: "CSE",
    year: "4th",
    section: "A",
    type: "Reference",
    uploadedBy: "Teacher",
    date: "2026-05-10",
    rating: 4.9,
    downloads: 567,
  },
];

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [activeFilters, setActiveFilters] = useState<{ type: string; value: string }[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery });
    }
  };

  const addFilter = (type: string, value: string) => {
    setActiveFilters((prev) => {
      const existing = prev.find((f) => f.type === type);
      if (existing) {
        return prev.map((f) => (f.type === type ? { type, value } : f));
      }
      return [...prev, { type, value }];
    });
  };

  const removeFilter = (type: string) => {
    setActiveFilters((prev) => prev.filter((f) => f.type !== type));
  };

  // Filter resources based on search query and active filters
  const filteredResources = mockResources.filter((resource) => {
    // Search query filter
    const query = searchParams.get("q") || searchQuery;
    if (query) {
      const lowerQuery = query.toLowerCase();
      const matchesSearch =
        resource.title.toLowerCase().includes(lowerQuery) ||
        resource.subject.toLowerCase().includes(lowerQuery) ||
        resource.department.toLowerCase().includes(lowerQuery);
      if (!matchesSearch) return false;
    }

    // Active filters
    for (const filter of activeFilters) {
      if (filter.type === "department" && resource.department !== filter.value) return false;
      if (filter.type === "year" && resource.year !== filter.value) return false;
      if (filter.type === "type" && resource.type !== filter.value) return false;
    }

    return true;
  });

  const currentQuery = searchParams.get("q") || searchQuery;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary/20 to-accent/10 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="bg-white border-b relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-6">
            Search Resources
          </h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch}>
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by title, subject, or department..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-lg"
              />
            </div>
          </form>

          {/* Quick Filter Pills */}
          {currentQuery && (
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Quick filters:</span>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => addFilter("department", "CSE")}
              >
                CSE
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => addFilter("year", "3rd")}
              >
                3rd Year
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => addFilter("type", "Model QP")}
              >
                Model QP
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => addFilter("type", "Notes")}
              >
                Notes
              </Badge>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active Filters & Results Count */}
        {currentQuery && (
          <div className="mb-6">
            <p className="text-lg mb-4">
              <span className="font-semibold">{filteredResources.length} results</span> for "
              {currentQuery}"
            </p>

            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {activeFilters.map((filter) => (
                  <Badge
                    key={filter.type}
                    variant="secondary"
                    className="bg-primary text-primary-foreground"
                  >
                    {filter.value}
                    <button
                      onClick={() => removeFilter(filter.type)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" onClick={() => setActiveFilters([])}>
                  Clear all
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Results */}
        {currentQuery ? (
          filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-4">
                <FileQuestion className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="font-serif text-2xl font-semibold mb-2">No results found</h2>
              <p className="text-muted-foreground mb-6">
                Be the first to upload this resource!
              </p>
              <Button asChild className="bg-accent hover:bg-accent/90">
                <Link to="/upload">Upload Now</Link>
              </Button>
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary mb-4">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="font-serif text-2xl font-semibold mb-2">Start searching</h2>
            <p className="text-muted-foreground mb-6">
              Search for notes, question papers, and study materials
            </p>
            <Button asChild variant="outline">
              <Link to="/browse">Browse All Resources</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
