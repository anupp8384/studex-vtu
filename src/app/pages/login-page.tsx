import { Navigate } from "react-router";
import { LoginScreen } from "../auth/LoginScreen";
import { useAuth } from "../context/auth-context";

export function LoginPage() {
  const {
    user, accountStatus, signInWithGoogle, isInitialising, isProfileLoading, isLoading, loginError,
  } = useAuth();

  if (isInitialising || isProfileLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBFAF5]">
        <p className="text-sm text-slate-600">Checking your account…</p>
      </div>
    );
  }

  if (user) {
    if (accountStatus === "none") return <Navigate to="/register" replace />;
    if (accountStatus === "pending") return <Navigate to="/pending" replace />;
    if (accountStatus === "rejected") return <Navigate to="/rejected" replace />;
    return <Navigate to="/" replace />;
  }

  return (
    <LoginScreen
      onGoogleSignIn={signInWithGoogle}
      isLoading={isLoading}
      errorMessage={loginError}
    />
  );
}
