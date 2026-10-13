import { Outlet } from "react-router";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { useEffect } from "react";
import { useLocation } from "react-router";

export function Layout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}