import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import { ResourceCard } from "../components/resource-card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "../components/ui/sheet";
import { Filter, Search, X } from "lucide-react";

const mockResources: {
  id: string; title: string; subject: string; department: string;
  year: string; section: string; type: string; uploadedBy: string;
  date: string; rating: number;
}[] = [];

interface FilterContentProps {
  idPrefix?: string;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  department: string;
  setDepartment: (value: string) => void;
  year: string;
  setYear: (value: string) => void;
  section: string;
  setSection: (value: string) => void;
  resourceTypes: string[];
  toggleResourceType: (type: string) => void;
  resetFilters: () => void;
}

function FilterContent({
  idPrefix = "",
  searchQuery,
  setSearchQuery,
  department,
  setDepartment,
  year,
  setYear,
  section,
  setSection,
  resourceTypes,
  toggleResourceType,
  resetFilters,
}: FilterContentProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label htmlFor={`${idPrefix}search`}>
            Search
          </Label>
          {searchQuery && (
            <span className="text-xs text-accent font-medium">
              Active
            </span>
          )}
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id={`${idPrefix}search`}
            type="text"
            placeholder="Search by title, subject, department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
            autoComplete="off"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {searchQuery && (
          <p className="text-xs text-muted-foreground mt-1">
            Searching: "{searchQuery}"
          </p>
        )}
      </div>

      <div>
        <Label htmlFor={`${idPrefix}department`} className="mb-2 block">
          Department
        </Label>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger id={`${idPrefix}department`}>
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="CSE">Computer Science & Engineering</SelectItem>
            <SelectItem value="ISE">Information Science & Engineering</SelectItem>
            <SelectItem value="ECE">Electronics & Communication</SelectItem>
            <SelectItem value="ME">Mechanical Engineering</SelectItem>
            <SelectItem value="Civil">Civil Engineering</SelectItem>
            <SelectItem value="EEE">Electrical & Electronics</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="mb-3 block">Year</Label>
        <RadioGroup value={year} onValueChange={setYear}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id={`${idPrefix}year-all`} />
            <Label htmlFor={`${idPrefix}year-all`} className="font-normal cursor-pointer">
              All Years
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1st" id={`${idPrefix}year-1`} />
            <Label htmlFor={`${idPrefix}year-1`} className="font-normal cursor-pointer">
              1st Year
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2nd" id={`${idPrefix}year-2`} />
            <Label htmlFor={`${idPrefix}year-2`} className="font-normal cursor-pointer">
              2nd Year
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3rd" id={`${idPrefix}year-3`} />
            <Label htmlFor={`${idPrefix}year-3`} className="font-normal cursor-pointer">
              3rd Year
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4th" id={`${idPrefix}year-4`} />
            <Label htmlFor={`${idPrefix}year-4`} className="font-normal cursor-pointer">
              4th Year
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="mb-3 block">Section</Label>
        <RadioGroup value={section} onValueChange={setSection}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id={`${idPrefix}section-all`} />
            <Label htmlFor={`${idPrefix}section-all`} className="font-normal cursor-pointer">
              All Sections
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="A" id={`${idPrefix}section-a`} />
            <Label htmlFor={`${idPrefix}section-a`} className="font-normal cursor-pointer">
              Section A
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="B" id={`${idPrefix}section-b`} />
            <Label htmlFor={`${idPrefix}section-b`} className="font-normal cursor-pointer">
              Section B
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="C" id={`${idPrefix}section-c`} />
            <Label htmlFor={`${idPrefix}section-c`} className="font-normal cursor-pointer">
              Section C
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="D" id={`${idPrefix}section-d`} />
            <Label htmlFor={`${idPrefix}section-d`} className="font-normal cursor-pointer">
              Section D
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label className="mb-3 block">Resource Type</Label>
        <div className="space-y-3">
          {["Notes", "Model QP", "PPT", "Reference"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`${idPrefix}type-${type}`}
                checked={resourceTypes.includes(type)}
                onCheckedChange={() => toggleResourceType(type)}
              />
              <Label htmlFor={`${idPrefix}type-${type}`} className="font-normal cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={resetFilters}
      >
        Reset Filters
      </Button>
    </div>
  );
}

export function BrowsePage() {
  const [department, setDepartment] = useState<string>("all");
  const [year, setYear] = useState<string>("all");
  const [section, setSection] = useState<string>("all");
  const [resourceTypes, setResourceTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>({});

  const handleDownload = (id: string) => {
    setDownloadCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  const toggleResourceType = (type: string) => {
    setResourceTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const resetFilters = () => {
    setDepartment("all");
    setYear("all");
    setSection("all");
    setResourceTypes([]);
    setSearchQuery("");
  };

  // Filter resources
  const filteredResources = mockResources.filter((resource) => {
    // Apply other filters first
    if (department !== "all" && resource.department !== department) return false;
    if (year !== "all" && resource.year !== year) return false;
    if (section !== "all" && resource.section !== section) return false;
    if (resourceTypes.length > 0 && !resourceTypes.includes(resource.type)) return false;

    // Search filter - comprehensive search across multiple fields
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      const normalizedQuery = trimmedQuery.toLowerCase();

      // Search in multiple fields
      const titleMatch = resource.title.toLowerCase().includes(normalizedQuery);
      const subjectMatch = resource.subject.toLowerCase().includes(normalizedQuery);
      const departmentMatch = resource.department.toLowerCase().includes(normalizedQuery);
      const typeMatch = resource.type.toLowerCase().includes(normalizedQuery);

      // Return true if ANY field matches
      return titleMatch || subjectMatch || departmentMatch || typeMatch;
    }

    return true;
  });

  // Sort resources
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    if (sortBy === "helpful") {
      return b.rating - a.rating;
    }
    if (sortBy === "downloads") {
      return (downloadCounts[b.id] ?? 0) - (downloadCounts[a.id] ?? 0);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-secondary/20 to-accent/10 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-primary mb-8">
          Browse Resources
        </h1>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 sticky top-24">
              <h2 className="font-serif text-xl font-semibold mb-6">Filters</h2>
              <FilterContent
                idPrefix="desktop-"
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                department={department}
                setDepartment={setDepartment}
                year={year}
                setYear={setYear}
                section={section}
                setSection={setSection}
                resourceTypes={resourceTypes}
                toggleResourceType={toggleResourceType}
                resetFilters={resetFilters}
              />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Sort */}
            <div className="flex items-center justify-between mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>
                      Filter resources by department, year, section, and type
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent
                      idPrefix="mobile-"
                      searchQuery={searchQuery}
                      setSearchQuery={setSearchQuery}
                      department={department}
                      setDepartment={setDepartment}
                      year={year}
                      setYear={setYear}
                      section={section}
                      setSection={setSection}
                      resourceTypes={resourceTypes}
                      toggleResourceType={toggleResourceType}
                      resetFilters={resetFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>

              <div className="flex items-center justify-end gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="helpful">Most Helpful</SelectItem>
                    <SelectItem value="downloads">Most Downloaded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Resources Grid */}
            {sortedResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedResources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    downloads={downloadCounts[resource.id] ?? 0}
                    onDownload={() => handleDownload(resource.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground mb-4">No resources found matching your filters</p>
                <Button
                  variant="outline"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}