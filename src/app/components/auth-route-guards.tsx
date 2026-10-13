import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuth } from "../context/auth-context";

function getAccountDestination(status: ReturnType<typeof useAuth>["accountStatus"]): string | null {
  if (status === "none") return "/register";
  if (status === "pending") return "/pending";
  if (status === "rejected") return "/rejected";
  return null;
}

export function ApprovedRouteGuard({ children }: { children: ReactNode }) {
  const { user, accountStatus, isInitialising, isProfileLoading } = useAuth();
  if (isInitialising || isProfileLoading) return <RouteAccessLoading />;
  if (!user) return <Navigate to="/login" replace />;
  const destination = getAccountDestination(accountStatus);
  return destination ? <Navigate to={destination} replace /> : <>{children}</>;
}

export function SignedInRouteGuard({ children }: { children: ReactNode }) {
  const { user, accountStatus, isInitialising, isProfileLoading } = useAuth();
  if (isInitialising || isProfileLoading) return <RouteAccessLoading />;
  if (!user) return <Navigate to="/login" replace />;
  const destination = getAccountDestination(accountStatus);
  return destination ? <Navigate to={destination} replace /> : <>{children}</>;
}

export function AdminRouteGuard({ children }: { children: ReactNode }) {
  const { user, accountStatus, role, isInitialising, isProfileLoading } = useAuth();
  if (isInitialising || isProfileLoading) return <RouteAccessLoading />;
  if (!user || role !== "admin" || accountStatus !== "approved") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export function RouteAccessLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FBFAF5]">
      <p className="text-sm text-slate-600">Checking your account…</p>
    </div>
  );
}
