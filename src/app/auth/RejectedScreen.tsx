import logoImage from "../../imports/WhatsApp_Image_2026-05-28_at_5.04.56_PM.jpeg";
import { authColors, authCopy, authFonts, authRadius, authShadow, authSpacing } from "./auth-theme";

export type RejectedScreenProps = {
  reason?: string;
  onContactAdmin: () => void;
  onRequestReview: () => void;
  onLogout: () => void;
  isRequestingReview: boolean;
};

function ReviewButtonSpinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

export function RejectedScreen({
  reason,
  onContactAdmin,
  onRequestReview,
  onLogout,
  isRequestingReview,
}: RejectedScreenProps) {
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
          aria-labelledby="rejected-heading"
        >
          <div
            className="mb-6 flex h-12 w-12 items-center justify-center rounded-full"
            style={{ background: authColors.accentMuted, color: authColors.textMuted }}
            aria-hidden="true"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4" />
              <path d="M12 16h.01" />
            </svg>
          </div>

          <h1 id="rejected-heading" className="text-2xl font-bold text-slate-800" style={{ fontFamily: authFonts.heading }}>
            {authCopy.rejectedHeading}
          </h1>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: authColors.textMuted }}>
            {authCopy.rejectedBody}
          </p>

          {reason?.trim() && (
            <p
              className="mt-5 rounded-lg px-4 py-3 text-sm leading-relaxed"
              role="note"
              style={{
                background: authColors.accentMuted,
                border: `1px solid ${authColors.border}`,
                borderRadius: authRadius.md,
                color: authColors.textMuted,
              }}
            >
              <span className="font-medium" style={{ color: authColors.text }}>{authCopy.rejectedReasonLabel}: </span>
              {reason}
            </p>
          )}

          <div className="mt-7 flex flex-col" style={{ gap: authSpacing.headerGap }}>
            <button
              type="button"
              onClick={onContactAdmin}
              className="w-full px-5 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B9BB8]"
              style={{
                minHeight: authSpacing.buttonMinHeight,
                background: authColors.surface,
                border: `1.5px solid ${authColors.border}`,
                borderRadius: authRadius.md,
                color: authColors.text,
                fontFamily: authFonts.body,
              }}
            >
              {authCopy.contactAdministrator}
            </button>

            <button
              type="button"
              onClick={onRequestReview}
              disabled={isRequestingReview}
              aria-busy={isRequestingReview}
              className="flex w-full items-center justify-center gap-2 px-5 font-semibold transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B9BB8] disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                minHeight: authSpacing.buttonMinHeight,
                background: authColors.gold,
                border: "none",
                borderRadius: authRadius.md,
                color: authColors.text,
                fontFamily: authFonts.heading,
              }}
            >
              {isRequestingReview && <ReviewButtonSpinner />}
              {isRequestingReview ? authCopy.requestReviewLoading : authCopy.requestReview}
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="w-full px-5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B9BB8]"
              style={{
                minHeight: authSpacing.buttonMinHeight,
                background: "transparent",
                border: "none",
                borderRadius: authRadius.md,
                color: authColors.textMuted,
                fontFamily: authFonts.body,
              }}
            >
              {authCopy.logOut}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
