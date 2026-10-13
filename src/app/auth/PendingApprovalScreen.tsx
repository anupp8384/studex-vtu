import logoImage from "../../imports/WhatsApp_Image_2026-05-28_at_5.04.56_PM.jpeg";
import { authColors, authCopy, authFonts, authRadius, authShadow, authSpacing } from "./auth-theme";

export type ApprovalStep = "google_verified" | "usn_submitted" | "admin_approved";
export type ApprovalStepStatus = "done" | "in_progress" | "waiting";
export type ApprovalStepStatuses = Record<ApprovalStep, ApprovalStepStatus>;

export type PendingApprovalScreenProps = {
  status: ApprovalStepStatuses;
  onLogout: () => void;
};

const APPROVAL_STEPS: { id: ApprovalStep; label: string }[] = [
  { id: "google_verified", label: authCopy.pendingSteps.google_verified },
  { id: "usn_submitted", label: authCopy.pendingSteps.usn_submitted },
  { id: "admin_approved", label: authCopy.pendingSteps.admin_approved },
];

const STEP_STATE_COPY: Record<ApprovalStepStatus, string> = {
  done: authCopy.pendingStepStates.done,
  in_progress: authCopy.pendingStepStates.in_progress,
  waiting: authCopy.pendingStepStates.waiting,
};

function ApprovalStepIcon({ status }: { status: ApprovalStepStatus }) {
  const colors = {
    done: {
      background: authColors.successSurface,
      border: authColors.successBorder,
      foreground: authColors.successText,
    },
    in_progress: {
      background: authColors.accentMuted,
      border: authColors.accent,
      foreground: authColors.text,
    },
    waiting: {
      background: authColors.surface,
      border: authColors.border,
      foreground: authColors.textMuted,
    },
  }[status];

  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
      style={{ background: colors.background, border: `2px solid ${colors.border}`, color: colors.foreground }}
    >
      {status === "done" ? (
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ) : status === "in_progress" ? (
        <span className="h-2.5 w-2.5 rounded-full" style={{ background: authColors.focus }} />
      ) : (
        <span className="h-2 w-2 rounded-full" style={{ background: authColors.textLight }} />
      )}
    </span>
  );
}

export function PendingApprovalScreen({ status, onLogout }: PendingApprovalScreenProps) {
  return (
    <main
      className="flex min-h-screen items-center justify-center"
      style={{
        background: authColors.background,
        fontFamily: authFonts.body,
        padding: `${authSpacing.pageY} ${authSpacing.pageX}`,
      }}
    >
      <div className="w-full max-w-lg">
        <div className="mb-8 flex items-center" style={{ gap: authSpacing.headerGap }}>
          <img src={logoImage} alt="Studex logo" className="h-9 w-auto object-contain" />
          <span className="text-xl font-bold text-slate-800" style={{ fontFamily: authFonts.heading }}>
            {authCopy.appName}
          </span>
        </div>

        <section
          className="bg-white"
          style={{
            padding: authSpacing.cardPadding,
            border: `1px solid ${authColors.border}`,
            borderRadius: authRadius.xl,
            boxShadow: authShadow.card,
          }}
          aria-labelledby="pending-heading"
        >
          <div
            className="mb-6 flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: authColors.accentMuted, color: authColors.text }}
            aria-hidden="true"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </div>

          <h1 id="pending-heading" className="text-2xl font-bold leading-snug text-slate-800" style={{ fontFamily: authFonts.heading }}>
            {authCopy.pendingHeading}
          </h1>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: authColors.textMuted }}>
            {authCopy.pendingBody}
          </p>

          <ol className="mt-8" aria-label="Verification progress">
            {APPROVAL_STEPS.map((step, index) => {
              const stepStatus = status[step.id];
              const isLast = index === APPROVAL_STEPS.length - 1;
              return (
                <li key={step.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <ApprovalStepIcon status={stepStatus} />
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="my-1 min-h-7 w-px flex-1"
                        style={{ background: stepStatus === "done" ? authColors.successBorder : authColors.border }}
                      />
                    )}
                  </div>
                  <div className={`flex flex-1 items-start justify-between gap-3 ${isLast ? "" : "pb-5"}`}>
                    <span className="pt-2 text-sm font-medium text-slate-800">{step.label}</span>
                    <span
                      className="shrink-0 pt-2 text-xs"
                      style={{ color: stepStatus === "waiting" ? authColors.textLight : authColors.textMuted }}
                    >
                      {STEP_STATE_COPY[stepStatus]}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>

          <p className="mt-7 rounded-lg px-4 py-3 text-sm" style={{ background: authColors.accentMuted, color: authColors.textMuted }}>
            {authCopy.pendingWaitTime}
          </p>

          <button
            type="button"
            onClick={onLogout}
            className="mt-6 w-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B9BB8]"
            style={{
              minHeight: authSpacing.buttonMinHeight,
              background: "transparent",
              border: `1.5px solid ${authColors.border}`,
              borderRadius: authRadius.md,
              color: authColors.textMuted,
              fontFamily: authFonts.body,
            }}
          >
            {authCopy.logOut}
          </button>
        </section>
      </div>
    </main>
  );
}
