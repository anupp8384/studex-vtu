import { useEffect } from "react";
import { useNavigate, Navigate } from "react-router";
import { RegistrationForm } from "../auth/RegistrationForm";
import { useAuth } from "../context/auth-context";

export function RegisterPage() {
  const { user, accountStatus, submitRegistration, isLoading, registrationError } = useAuth();
  const navigate = useNavigate();

  // Redirect users who shouldn't be here
  useEffect(() => {
    if (!user)                        { navigate("/login",    { replace: true }); return; }
    if (accountStatus === "pending")  { navigate("/pending",  { replace: true }); return; }
    if (accountStatus === "rejected") { navigate("/rejected", { replace: true }); return; }
    if (accountStatus === "approved") { navigate("/",         { replace: true }); return; }
  }, [user, accountStatus, navigate]);

  if (!user) return <Navigate to="/login" replace />;

  return (
    <RegistrationForm
      initialName={user.name}
      email={user.email}
      onSubmit={submitRegistration}
      isSubmitting={isLoading}
      errorMessage={registrationError}
    />
  );
}
