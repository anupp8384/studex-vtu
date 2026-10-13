import { useEffect } from "react";
import { useNavigate } from "react-router";
import { LoginScreen } from "../auth/LoginScreen";
import { useAuth } from "../context/auth-context";

export function LoginPage() {
  const { user, accountStatus, signInWithGoogle, isLoading, loginError } = useAuth();
  const navigate = useNavigate();

  // Redirect already-authenticated users to the right place
  useEffect(() => {
    if (!user) return;
    if (accountStatus === "none")     { navigate("/register", { replace: true }); return; }
    if (accountStatus === "pending")  { navigate("/pending",  { replace: true }); return; }
    if (accountStatus === "rejected") { navigate("/rejected", { replace: true }); return; }
    if (accountStatus === "approved") { navigate("/",         { replace: true }); return; }
  }, [user, accountStatus, navigate]);

  return (
    <LoginScreen
      onGoogleSignIn={signInWithGoogle}
      isLoading={isLoading}
      errorMessage={loginError}
    />
  );
}
