import { Navigate } from "react-router";
import { RejectedScreen } from "../auth/RejectedScreen";
import { RouteAccessLoading } from "../components/auth-route-guards";
import { useAuth } from "../context/auth-context";

export function RejectedPage() {
  const { user, accountStatus, isInitialising, isProfileLoading, logout } = useAuth();

  if (isInitialising || isProfileLoading) return <RouteAccessLoading />;
  if (!user) return <Navigate to="/login" replace />;
  if (accountStatus === "none") return <Navigate to="/register" replace />;
  if (accountStatus === "pending") return <Navigate to="/pending" replace />;
  if (accountStatus === "approved") return <Navigate to="/" replace />;

  return (
    <RejectedScreen
      onContactAdmin={() => {
        // TODO: supply the administrator contact action.
      }}
      onRequestReview={() => {
        // TODO: supply the review request action.
      }}
      onLogout={logout}
      isRequestingReview={false}
    />
  );
}
