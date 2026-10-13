import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router";
import { PendingApprovalScreen } from "../auth/PendingApprovalScreen";
import { useAuth } from "../context/auth-context";

export function PendingPage() {
  const { user, accountStatus, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user)                        { navigate("/login",    { replace: true }); return; }
    if (accountStatus === "none")     { navigate("/register", { replace: true }); return; }
    if (accountStatus === "rejected") { navigate("/rejected", { replace: true }); return; }
    if (accountStatus === "approved") { navigate("/",         { replace: true }); return; }
  }, [user, accountStatus, navigate]);

  if (!user || accountStatus !== "pending") return <Navigate to="/login" replace />;

  return (
    <PendingApprovalScreen
      completedUpTo="usn_submitted"
      onLogout={logout}
    />
  );
}
