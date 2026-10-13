import logoImage from "../../imports/WhatsApp_Image_2026-05-28_at_5.04.56_PM.jpeg";
import { authColors, authCopy, authRadius, authShadow } from "./auth-theme";

// ── Types ─────────────────────────────────────────────────────────────────────
export type RejectedScreenProps = {
  /** Optional: the specific reason provided by the admin */
  rejectionReason?: string;
  onContactAdmin: () => void;
  onRequestReview: () => void;
  onLogout: () => void;
  /** Show loading spinner on "Request a review" while the request is in-flight */
  isRequestingReview?: boolean;
};

// ── Spinner ───────────────────────────────────────────────────────────────────
function ButtonSpinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export function RejectedScreen({
  rejectionReason,
  onContactAdmin,
  onRequestReview,
  onLogout,
  isRequestingReview = false,
}: RejectedScreenProps) {
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
            border: `1px solid ${authColors.errorBorder}`,
            borderRadius: authRadius.xl,
            boxShadow: authShadow.card,
          }}
        >
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
            style={{ background: authColors.errorSurface, border: `2px solid ${authColors.errorBorder}` }}
          >
            <svg className="w-7 h-7" style={{ color: authColors.error }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </div>

          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: authColors.text }}>
            {authCopy.rejectedHeading}
          </h1>
          <p className="text-sm mb-6 leading-relaxed" style={{ color: authColors.textMuted }}>
            {authCopy.rejectedBody}
          </p>

          {/* Rejection reason */}
          {rejectionReason && (
            <div
              className="px-4 py-3 rounded-lg mb-6 text-sm"
              role="note"
              aria-label="Rejection reason"
              style={{
                background: authColors.errorSurface,
                border: `1px solid ${authColors.errorBorder}`,
                borderRadius: authRadius.md,
              }}
            >
              <p className="font-medium mb-1" style={{ color: authColors.error }}>Reason provided</p>
              <p style={{ color: authColors.textMuted }}>{rejectionReason}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            {/* Primary: request review */}
            <button
              onClick={onRequestReview}
              disabled={isRequestingReview}
              aria-busy={isRequestingReview}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 font-semibold transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: authColors.gold,
                color: "#1a1a2e",
                border: "none",
                borderRadius: authRadius.md,
                fontSize: "0.9375rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {isRequestingReview && <ButtonSpinner />}
              <span>{isRequestingReview ? "Sending request…" : "Request a review"}</span>
            </button>

            {/* Secondary: contact admin */}
            <button
              onClick={onContactAdmin}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-5 text-sm font-medium transition-colors"
              style={{
                background: "transparent",
                border: `1.5px solid ${authColors.border}`,
                borderRadius: authRadius.md,
                color: authColors.text,
              }}
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Contact administrator
            </button>

            {/* Tertiary: log out */}
            <button
              onClick={onLogout}
              className="w-full py-2.5 text-sm font-medium transition-colors"
              style={{
                background: "transparent",
                border: "none",
                color: authColors.textLight,
                borderRadius: authRadius.md,
              }}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
