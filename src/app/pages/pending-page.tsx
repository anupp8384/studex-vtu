import { Navigate } from "react-router";
import { PendingApprovalScreen } from "../auth/PendingApprovalScreen";
import { RouteAccessLoading } from "../components/auth-route-guards";
import { useAuth } from "../context/auth-context";

export function PendingPage() {
  const { user, accountStatus, isInitialising, isProfileLoading, logout } = useAuth();

  if (isInitialising || isProfileLoading) return <RouteAccessLoading />;
  if (!user) return <Navigate to="/login" replace />;
  if (accountStatus === "none") return <Navigate to="/register" replace />;
  if (accountStatus === "rejected") return <Navigate to="/rejected" replace />;
  if (accountStatus === "approved") return <Navigate to="/" replace />;

  return (
    <PendingApprovalScreen
      status={{
        google_verified: "done",
        usn_submitted: "done",
        admin_approved: "in_progress",
      }}
      onLogout={logout}
    />
  );
}
