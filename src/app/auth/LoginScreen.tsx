import type { ReactNode } from "react";
import logoImage from "../../imports/WhatsApp_Image_2026-05-28_at_5.04.56_PM.jpeg";
import studentImage from "../../imports/multiethnic-group-young-happy-students-standing-outdoors.jpg";
import { authColors, authCopy, authFonts, authRadius, authShadow, authSpacing } from "./auth-theme";

// ── Google "G" SVG (official brand colours, no external dependency) ──────────
function GoogleLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

// ── Spinner ───────────────────────────────────────────────────────────────────
function LoginButtonSpinner() {
  return (
    <svg className="animate-spin h-4 w-4 text-slate-500" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────
export type LoginScreenProps = {
  onGoogleSignIn: () => void;
  isLoading: boolean;
  errorMessage?: string;
  /** Replace the default student photo without changing the login layout. */
  illustrationSlot?: ReactNode;
  /** Optional replacement photo source for the illustration panel. */
  illustrationSrc?: string;
};

// ── Component ─────────────────────────────────────────────────────────────────
export function LoginScreen({
  onGoogleSignIn,
  isLoading,
  errorMessage,
  illustrationSlot,
  illustrationSrc = studentImage,
}: LoginScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col md:flex-row"
      style={{ background: authColors.background, fontFamily: authFonts.body }}
    >
      {/* ── Left: form panel ── */}
      <div
        className="flex-1 flex items-center justify-center"
        style={{ padding: `${authSpacing.pageY} ${authSpacing.pageX}` }}
      >
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex items-center mb-8" style={{ gap: authSpacing.headerGap }}>
            <img src={logoImage} alt="Studex logo" className="h-10 w-auto object-contain" />
            <span className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {authCopy.appName}
            </span>
          </div>
          <p className="mb-8 -mt-6 text-sm" style={{ color: authColors.textMuted }}>
            {authCopy.tagline}
          </p>

          <h1
            className="text-3xl font-bold mb-2 text-slate-800"
            style={{ fontFamily: authFonts.heading }}
          >
            {authCopy.loginHeading}
          </h1>
          <p className="text-base mb-8 leading-relaxed" style={{ color: authColors.textMuted }}>
            {authCopy.loginDescription}
          </p>

          {/* Google button */}
          <button
            type="button"
            onClick={onGoogleSignIn}
            disabled={isLoading}
            aria-busy={isLoading}
            className="w-full flex items-center justify-center gap-3 px-5 font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#5B9BB8] disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              background: '#FFFFFF',
              border: `1.5px solid ${authColors.border}`,
              borderRadius: authRadius.md,
              boxShadow: authShadow.input,
              fontSize: '0.9375rem',
              color: authColors.googleText,
              minHeight: authSpacing.buttonMinHeight,
            }}
          >
            {isLoading ? <LoginButtonSpinner /> : <GoogleLogo size={20} />}
            <span>{isLoading ? authCopy.googleButtonLoading : authCopy.googleButtonLabel}</span>
          </button>

          {/* Inline error */}
          {errorMessage && (
            <div
              role="alert"
              className="mt-4 flex items-start gap-2 px-4 py-3 text-sm rounded-lg"
              style={{
                background: authColors.errorSurface,
                border: `1px solid ${authColors.errorBorder}`,
                color: authColors.error,
                borderRadius: authRadius.md,
              }}
            >
              <svg className="h-4 w-4 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-8-3a1 1 0 00-1 1v2a1 1 0 002 0V8a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Disclaimer */}
          <p className="mt-6 text-xs leading-relaxed text-center" style={{ color: authColors.textLight }}>
            {authCopy.googleDisclaimer}
          </p>
        </div>
      </div>

      {/* ── Student illustration panel ── */}
      <div className="block h-52 px-4 pb-4 md:h-auto md:w-[46%] md:p-5 lg:w-[52%] lg:p-8">
        <StudentIllustrationPanel slot={illustrationSlot} imageSource={illustrationSrc} />
      </div>
    </div>
  );
}

function StudentIllustrationPanel({ slot, imageSource }: { slot?: ReactNode; imageSource: string }) {
  return (
    <div
      className="relative h-full min-h-48 overflow-hidden flex items-end rounded-3xl md:min-h-[32rem]"
      style={{ background: authColors.accent, boxShadow: authShadow.card }}
    >
      {slot || (
        <img
          src={imageSource}
          alt={authCopy.registrationIllustrationAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
      <div className="relative z-10 max-w-lg p-8 lg:p-12">
        <p className="text-3xl font-bold leading-tight text-white" style={{ fontFamily: authFonts.heading }}>
          {authCopy.tagline}
        </p>
        <p className="mt-3 text-sm text-white/90">
          {authCopy.resourceTypes.notes} <span aria-hidden="true">·</span>{" "}
          {authCopy.resourceTypes.papers} <span aria-hidden="true">·</span>{" "}
          {authCopy.resourceTypes.presentations}
        </p>
      </div>
    </div>
  );
}
