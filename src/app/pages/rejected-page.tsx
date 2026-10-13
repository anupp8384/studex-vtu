import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router";
import { RejectedScreen } from "../auth/RejectedScreen";
import { useAuth } from "../context/auth-context";

export function RejectedPage() {
  const { user, accountStatus, logout, requestReview, rejectionReason, isRequestingReview } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user)                        { navigate("/login",    { replace: true }); return; }
    if (accountStatus === "none")     { navigate("/register", { replace: true }); return; }
    if (accountStatus === "pending")  { navigate("/pending",  { replace: true }); return; }
    if (accountStatus === "approved") { navigate("/",         { replace: true }); return; }
  }, [user, accountStatus, navigate]);

  if (!user || accountStatus !== "rejected") return <Navigate to="/login" replace />;

  function handleContactAdmin() {
    // TODO: open a mailto / support link when wiring Supabase
    window.location.href = "mailto:studex-admin@example.com";
  }

  return (
    <RejectedScreen
      rejectionReason={rejectionReason}
      onContactAdmin={handleContactAdmin}
      onRequestReview={requestReview}
      onLogout={logout}
      isRequestingReview={isRequestingReview}
    />
  );
}
