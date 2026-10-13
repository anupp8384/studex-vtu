import { Navigate } from "react-router";
import { RegistrationForm, type RegistrationData } from "../auth/RegistrationForm";
import { RouteAccessLoading } from "../components/auth-route-guards";
import { useAuth } from "../context/auth-context";

export function RegisterPage() {
  const {
    user,
    accountStatus,
    isInitialising,
    isProfileLoading,
    submitRegistration,
    registrationError,
    registrationResult,
    isRegistrationSubmitting,
  } = useAuth();

  if (isInitialising || isProfileLoading) return <RouteAccessLoading />;
  if (!user) return <Navigate to="/login" replace />;
  if (accountStatus === "pending") return <Navigate to="/pending" replace />;
  if (accountStatus === "rejected") return <Navigate to="/rejected" replace />;
  if (accountStatus === "approved") return <Navigate to="/" replace />;

  function handleRegistrationSubmit(data: RegistrationData) {
    return submitRegistration({
      fullName: data.fullName,
      usn: data.usn.trim().toUpperCase(),
      department: data.department,
      academicYear: data.academicYear,
    });
  }

  return (
    <RegistrationForm
      initialName={user.name}
      email={user.email}
      onSubmit={handleRegistrationSubmit}
      isSubmitting={isRegistrationSubmitting}
      errorMessage={registrationError}
      verificationResult={registrationResult}
    />
  );
}
