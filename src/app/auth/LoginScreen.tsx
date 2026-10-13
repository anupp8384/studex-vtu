import type { ReactNode } from "react";
import logoImage from "../../imports/WhatsApp_Image_2026-05-28_at_5.04.56_PM.jpeg";
import { authColors, authCopy, authRadius, authShadow } from "./auth-theme";

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

// ── Decorative illustration panel ────────────────────────────────────────────
function IllustrationPanel({ slot }: { slot?: ReactNode }) {
  if (slot) return <>{slot}</>;
  return (
    <div
      className="relative flex flex-col items-center justify-center h-full min-h-[320px] overflow-hidden select-none"
      style={{ background: `linear-gradient(135deg, ${authColors.accent} 0%, #c8eaf5 60%, ${authColors.accentMuted} 100%)` }}
    >
      {/* Floating resource cards (CSS art) */}
      <div className="absolute top-10 left-8 w-28 h-16 rounded-xl bg-white/70 shadow-md flex items-center gap-2 px-3" style={{ transform: 'rotate(-6deg)' }}>
        <div className="w-7 h-7 rounded-md flex-shrink-0" style={{ background: '#bfdbfe' }} />
        <div className="flex flex-col gap-1 flex-1">
          <div className="h-2 rounded bg-slate-200 w-full" />
          <div className="h-2 rounded bg-slate-200 w-3/4" />
        </div>
      </div>
      <div className="absolute top-24 right-6 w-24 h-14 rounded-xl bg-white/70 shadow-md flex items-center gap-2 px-3" style={{ transform: 'rotate(5deg)' }}>
        <div className="w-6 h-6 rounded-md flex-shrink-0" style={{ background: '#d9f99d' }} />
        <div className="flex flex-col gap-1 flex-1">
          <div className="h-2 rounded bg-slate-200 w-full" />
          <div className="h-2 rounded bg-slate-200 w-2/3" />
        </div>
      </div>
      <div className="absolute bottom-16 left-6 w-32 h-14 rounded-xl bg-white/70 shadow-md flex items-center gap-2 px-3" style={{ transform: 'rotate(3deg)' }}>
        <div className="w-6 h-6 rounded-md flex-shrink-0" style={{ background: '#fde68a' }} />
        <div className="flex flex-col gap-1 flex-1">
          <div className="h-2 rounded bg-slate-200 w-full" />
          <div className="h-2 rounded bg-slate-200 w-1/2" />
        </div>
      </div>
      <div className="absolute bottom-8 right-8 w-20 h-12 rounded-xl bg-white/70 shadow-md flex items-center gap-2 px-3" style={{ transform: 'rotate(-4deg)' }}>
        <div className="w-5 h-5 rounded-md flex-shrink-0" style={{ background: '#f9a8d4' }} />
        <div className="flex flex-col gap-1 flex-1">
          <div className="h-2 rounded bg-slate-200 w-full" />
          <div className="h-2 rounded bg-slate-200 w-3/4" />
        </div>
      </div>

      {/* Centre text */}
      <div className="relative z-10 text-center px-8">
        <p className="text-2xl font-bold text-slate-700 leading-snug mb-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {authCopy.tagline}
        </p>
        <p className="text-sm text-slate-500" style={{ fontFamily: "'Inter', sans-serif" }}>
          Notes · Question Papers · PPTs
        </p>
      </div>
    </div>
  );
}

// ── Spinner ───────────────────────────────────────────────────────────────────
function ButtonSpinner() {
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
  /** Optional: pass your own illustration/image node to replace the default panel */
  illustrationSlot?: ReactNode;
};

// ── Component ─────────────────────────────────────────────────────────────────
export function LoginScreen({ onGoogleSignIn, isLoading, errorMessage, illustrationSlot }: LoginScreenProps) {
  return (
    <div
      className="min-h-screen flex flex-col md:flex-row"
      style={{ background: authColors.background, fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Left: form panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 md:px-12 md:py-0">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <img src={logoImage} alt="Studex logo" className="h-10 w-auto object-contain" />
            <span className="text-2xl font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {authCopy.appName}
            </span>
          </div>

          <h1
            className="text-3xl font-bold mb-2 text-slate-800"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Welcome back
          </h1>
          <p className="text-base mb-8" style={{ color: authColors.textMuted }}>
            Sign in to access your college resources.
          </p>

          {/* Google button */}
          <button
            onClick={onGoogleSignIn}
            disabled={isLoading}
            aria-busy={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 px-5 font-medium text-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            style={{
              background: '#FFFFFF',
              border: `1.5px solid ${authColors.border}`,
              borderRadius: authRadius.md,
              boxShadow: authShadow.input,
              fontSize: '0.9375rem',
              focusRingColor: authColors.accent,
            }}
          >
            {isLoading ? <ButtonSpinner /> : <GoogleLogo size={20} />}
            <span>{isLoading ? 'Signing in…' : authCopy.googleButtonLabel}</span>
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

      {/* ── Right: illustration panel (hidden on small screens) ── */}
      <div className="hidden md:block md:w-[46%] lg:w-[52%]">
        <IllustrationPanel slot={illustrationSlot} />
      </div>
    </div>
  );
}
