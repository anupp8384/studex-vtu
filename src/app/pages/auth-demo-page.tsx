import { useState } from "react";
import { LoginScreen } from "../auth/LoginScreen";
import { RegistrationForm, type RegistrationData } from "../auth/RegistrationForm";
import { PendingApprovalScreen, type ApprovalStep } from "../auth/PendingApprovalScreen";
import { RejectedScreen } from "../auth/RejectedScreen";
import { authColors, authRadius } from "../auth/auth-theme";

type ScreenId = "login" | "register" | "pending" | "rejected";

const SCREEN_LABELS: { id: ScreenId; label: string }[] = [
  { id: "login",    label: "1. Login" },
  { id: "register", label: "2. Registration" },
  { id: "pending",  label: "3. Pending approval" },
  { id: "rejected", label: "4. Rejected" },
];

export function AuthDemoPage() {
  const [active, setActive] = useState<ScreenId>("login");

  // ── Login screen demo state ───────────────────────────────────────────────
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | undefined>();

  function handleGoogleSignIn() {
    setLoginError(undefined);
    setLoginLoading(true);
    setTimeout(() => {
      setLoginLoading(false);
      setLoginError("Demo mode: no Google OAuth connected. Use the switcher below.");
    }, 1400);
  }

  // ── Registration form demo state ──────────────────────────────────────────
  const [regSubmitting, setRegSubmitting] = useState(false);
  const [regError, setRegError] = useState<string | undefined>();

  function handleRegSubmit(data: RegistrationData) {
    setRegError(undefined);
    setRegSubmitting(true);
    setTimeout(() => {
      setRegSubmitting(false);
      setRegError(`Demo: received — ${data.fullName} / ${data.usn} / ${data.department} / ${data.academicYear}`);
    }, 1600);
  }

  // ── Pending screen demo state ─────────────────────────────────────────────
  const [pendingStep, setPendingStep] = useState<ApprovalStep>("usn_submitted");

  // ── Rejected screen demo state ────────────────────────────────────────────
  const [reviewRequesting, setReviewRequesting] = useState(false);

  function handleRequestReview() {
    setReviewRequesting(true);
    setTimeout(() => setReviewRequesting(false), 2000);
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ── Floating switcher bar ── */}
      <div
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex gap-1 p-1 shadow-lg"
        style={{
          background: "#fff",
          border: `1px solid ${authColors.border}`,
          borderRadius: authRadius.pill,
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        }}
      >
        {SCREEN_LABELS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className="px-4 py-2 text-sm font-medium transition-all whitespace-nowrap"
            style={{
              borderRadius: authRadius.pill,
              background: active === id ? authColors.gold : "transparent",
              color: active === id ? "#1a1a2e" : authColors.textMuted,
              border: "none",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Active screen ── */}
      {active === "login" && (
        <LoginScreen
          onGoogleSignIn={handleGoogleSignIn}
          isLoading={loginLoading}
          errorMessage={loginError}
        />
      )}

      {active === "register" && (
        <RegistrationForm
          initialName="Priya Sharma"
          email="priya.sharma@gmail.com"
          onSubmit={handleRegSubmit}
          isSubmitting={regSubmitting}
          errorMessage={regError}
          usnVerificationStatus="pending_review"
        />
      )}

      {active === "pending" && (
        <div>
          <PendingApprovalScreen
            completedUpTo={pendingStep}
            adminNote={pendingStep === "usn_submitted" ? "Your details look good. Approval within 24 hours." : undefined}
            onLogout={() => alert("Demo: logout called")}
          />
          {/* Step stepper for demo */}
          <div
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex gap-2 px-4 py-2 shadow-md"
            style={{
              background: "#fff",
              border: `1px solid ${authColors.border}`,
              borderRadius: authRadius.pill,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            <span className="text-xs" style={{ color: authColors.textMuted }}>Step:</span>
            {(["google_verified", "usn_submitted", "admin_approved"] as ApprovalStep[]).map((s) => (
              <button
                key={s}
                onClick={() => setPendingStep(s)}
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: pendingStep === s ? authColors.gold : authColors.accentMuted,
                  color: pendingStep === s ? "#1a1a2e" : authColors.textMuted,
                  border: "none",
                  fontFamily: "monospace",
                }}
              >
                {s.replace(/_/g, " ")}
              </button>
            ))}
          </div>
        </div>
      )}

      {active === "rejected" && (
        <RejectedScreen
          rejectionReason="The USN provided does not match any record in our college database. Please verify and resubmit."
          onContactAdmin={() => alert("Demo: contact admin")}
          onRequestReview={handleRequestReview}
          onLogout={() => alert("Demo: logout called")}
          isRequestingReview={reviewRequesting}
        />
      )}
    </div>
  );
}
