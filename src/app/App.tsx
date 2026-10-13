import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { PointsProvider } from "./context/points-context";
import { AuthProvider, useAuth } from "./context/auth-context";

function AuthGate({ children }: { children: React.ReactNode }) {
  const { isInitialising } = useAuth();

  if (isInitialising) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBFAF5]">
        <svg className="h-8 w-8 animate-spin text-[#FFBF00]" viewBox="0 0 24 24" fill="none" aria-label="Loading">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      </div>
    );
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <PointsProvider>
        <AuthGate>
          <RouterProvider router={router} />
        </AuthGate>
        <Toaster />
      </PointsProvider>
    </AuthProvider>
  );
}
