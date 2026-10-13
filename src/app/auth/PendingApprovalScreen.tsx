import logoImage from "../../imports/WhatsApp_Image_2026-05-28_at_5.04.56_PM.jpeg";
import { authColors, authCopy, authRadius, authShadow } from "./auth-theme";

// ── Types ─────────────────────────────────────────────────────────────────────
export type ApprovalStep = "google_verified" | "usn_submitted" | "admin_approved";

export type PendingApprovalScreenProps = {
  /** Which step is currently complete (each step implies all prior steps done) */
  completedUpTo: ApprovalStep;
  /** Optional: show when admin has added a note / ETA */
  adminNote?: string;
  onLogout: () => void;
};

// ── Step tracker data ─────────────────────────────────────────────────────────
const STEPS: { id: ApprovalStep; label: string; description: string }[] = [
  {
    id: "google_verified",
    label: "Google account verified",
    description: "Your Google login was confirmed.",
  },
  {
    id: "usn_submitted",
    label: "USN & details submitted",
    description: "Your college details are with the admin.",
  },
  {
    id: "admin_approved",
    label: "Admin approval",
    description: "An admin will grant access within 1–2 working days.",
  },
];

const stepOrder: Record<ApprovalStep, number> = {
  google_verified: 0,
  usn_submitted: 1,
  admin_approved: 2,
};

// ── Sub-components ────────────────────────────────────────────────────────────
function StepIcon({ state }: { state: "done" | "active" | "pending" }) {
  if (state === "done") {
    return (
      <span
        className="flex items-center justify-center w-8 h-8 rounded-full"
        style={{ background: authColors.successSurface, border: `2px solid ${authColors.successBorder}` }}
      >
        <svg className="w-4 h-4" style={{ color: authColors.successText }} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </span>
    );
  }
  if (state === "active") {
    return (
      <span
        className="flex items-center justify-center w-8 h-8 rounded-full"
        style={{ background: "#FFFBEB", border: `2px solid ${authColors.gold}` }}
      >
        <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: authColors.gold }} />
      </span>
    );
  }
  // pending
  return (
    <span
      className="flex items-center justify-center w-8 h-8 rounded-full"
      style={{ background: "#F9FAFB", border: `2px solid #E5E7EB` }}
    >
      <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#D1D5DB" }} />
    </span>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export function PendingApprovalScreen({ completedUpTo, adminNote, onLogout }: PendingApprovalScreenProps) {
  const completedIndex = stepOrder[completedUpTo];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: authColors.background, fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <img src={logoImage} alt="Studex logo" className="h-9 w-auto object-contain" />
          <span className="text-xl font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {authCopy.appName}
          </span>
        </div>

        <div
          className="p-7 md:p-9"
          style={{
            background: authColors.surface,
            border: `1px solid ${authColors.border}`,
            borderRadius: authRadius.xl,
            boxShadow: authShadow.card,
          }}
        >
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
            style={{ background: "#FFFBEB", border: `2px solid ${authColors.gold}` }}
          >
            <svg className="w-7 h-7" style={{ color: authColors.gold }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-slate-800 mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {authCopy.pendingHeading}
          </h1>
          <p className="text-sm mb-8 leading-relaxed" style={{ color: authColors.textMuted }}>
            {authCopy.pendingBody}
          </p>

          {/* Step tracker */}
          <ol className="space-y-0" aria-label="Verification progress">
            {STEPS.map((step, i) => {
              const state =
                i < completedIndex ? "done"
                : i === completedIndex ? "active"
                : "pending";

              const isLast = i === STEPS.length - 1;

              return (
                <li key={step.id} className="flex gap-4">
                  {/* Icon + connector line */}
                  <div className="flex flex-col items-center">
                    <StepIcon state={state} />
                    {!isLast && (
                      <div
                        className="w-0.5 flex-1 my-1"
                        style={{ background: i < completedIndex ? authColors.successBorder : "#E5E7EB", minHeight: "1.5rem" }}
                      />
                    )}
                  </div>

                  {/* Text */}
                  <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: state === "pending" ? authColors.textLight : authColors.text }}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: authColors.textLight }}>
                      {step.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* Optional admin note */}
          {adminNote && (
            <div
              className="mt-6 px-4 py-3 text-sm rounded-lg"
              style={{ background: authColors.accentMuted, border: `1px solid ${authColors.border}`, color: authColors.textMuted, borderRadius: authRadius.md }}
            >
              <span className="font-medium" style={{ color: authColors.text }}>Admin note: </span>
              {adminNote}
            </div>
          )}

          {/* Logout */}
          <button
            onClick={onLogout}
            className="mt-8 w-full py-2.5 text-sm font-medium transition-colors"
            style={{
              background: "transparent",
              border: `1.5px solid ${authColors.border}`,
              borderRadius: authRadius.md,
              color: authColors.textMuted,
            }}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
