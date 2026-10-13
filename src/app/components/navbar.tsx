import { Link, useLocation, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Menu, X, Search, LogOut, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import logoImage from "../../imports/WhatsApp_Image_2026-05-28_at_5.04.56_PM.jpeg";
import { CoinIcon } from "./coin-icon";
import { usePoints } from "../context/points-context";
import { useAuth } from "../context/auth-context";

// ── Avatar initials ───────────────────────────────────────────────────────────
function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

// ── Avatar dropdown menu ──────────────────────────────────────────────────────
function AvatarMenu({ name, email, onLogout }: { name: string; email: string; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full pr-2 pl-0.5 py-0.5 border border-slate-200 hover:border-slate-300 bg-white transition-colors"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {/* Avatar circle */}
        <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-slate-800"
          style={{ background: "#FFBF00" }}>
          {getInitials(name)}
        </span>
        <span className="hidden sm:block text-sm font-medium text-slate-700 max-w-[7rem] truncate">
          {name.split(" ")[0]}
        </span>
        <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50"
        >
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="text-sm font-semibold text-slate-800 truncate">{name}</p>
            <p className="text-xs text-slate-400 truncate mt-0.5">{email}</p>
          </div>
          <button
            role="menuitem"
            onClick={() => { setOpen(false); onLogout(); }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalPoints } = usePoints();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/browse", label: "Browse" },
  ];

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="Studex Logo" className="h-12 w-auto object-contain" />
            <span className="font-serif font-semibold text-xl text-slate-800">Studex</span>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </form>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors whitespace-nowrap ${
                  isActive(link.path)
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Points pill */}
            <Link
              to="/browse"
              className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors rounded-full px-3 py-1"
              title="Studex Points"
            >
              <CoinIcon size="xs" />
              <span className="text-sm font-semibold text-amber-800">{totalPoints === 0 ? "00" : totalPoints}</span>
            </Link>

            {/* Upload */}
            <Button asChild className="bg-[#FFBF00] hover:bg-[#FFBF00]/90 text-slate-900 font-bold shadow-md shadow-amber-200 ring-2 ring-[#FFBF00]/40 scale-105">
              <Link to="/upload">Upload</Link>
            </Button>

            {/* Log in / Avatar */}
            {user ? (
              <AvatarMenu name={user.name} email={user.email} onLogout={logout} />
            ) : (
              <Button asChild variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50">
                <Link to="/login">Log in</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="px-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </form>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="px-4 flex items-center gap-3 flex-wrap">
                <Link
                  to="/browse"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5"
                >
                  <CoinIcon size="xs" />
                  <span className="text-sm font-semibold text-amber-800">{totalPoints === 0 ? "00" : totalPoints} pts</span>
                </Link>

                <Button asChild className="flex-1 bg-[#FFBF00] hover:bg-[#FFBF00]/90 text-slate-900">
                  <Link to="/upload" onClick={() => setMobileMenuOpen(false)}>Upload Resource</Link>
                </Button>
              </div>

              {/* Log in / user row on mobile */}
              <div className="px-4 border-t pt-3">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-slate-800"
                        style={{ background: "#FFBF00" }}>
                        {getInitials(user.name)}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => { setMobileMenuOpen(false); logout(); }}
                      className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </div>
                ) : (
                  <Button asChild variant="outline" className="w-full border-slate-300">
                    <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Log in</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
