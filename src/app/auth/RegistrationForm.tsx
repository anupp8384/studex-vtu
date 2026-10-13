import { useState, type ChangeEvent, type FormEvent } from "react";
import logoImage from "../../imports/WhatsApp_Image_2026-05-28_at_5.04.56_PM.jpeg";
import { authColors, authCopy, authRadius, authShadow } from "./auth-theme";

// ── Types ─────────────────────────────────────────────────────────────────────
export type RegistrationData = {
  fullName: string;
  usn: string;
  department: string;
  academicYear: string;
};

export type UsnVerificationStatus =
  | "verified"
  | "mismatch"
  | "not_found"
  | "already_claimed"
  | "pending_review"
  | null;

export type RegistrationFormProps = {
  /** Prefilled from Google profile, editable */
  initialName: string;
  /** Read-only — comes from Google auth */
  email: string;
  onSubmit: (data: RegistrationData) => void;
  isSubmitting: boolean;
  errorMessage?: string;
  usnVerificationStatus?: UsnVerificationStatus;
};

// ── Static option lists ───────────────────────────────────────────────────────
const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Information Science & Engineering",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical & Electronics",
];

const ACADEMIC_YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

// ── Helpers ───────────────────────────────────────────────────────────────────
const usnStatusConfig: Record<
  NonNullable<UsnVerificationStatus>,
  { label: string; color: string; bg: string; border: string }
> = {
  verified:       { label: "USN verified",        color: authColors.successText,  bg: authColors.successSurface, border: authColors.successBorder },
  mismatch:       { label: "USN mismatch",         color: authColors.error,        bg: authColors.errorSurface,   border: authColors.errorBorder   },
  not_found:      { label: "USN not found",        color: authColors.error,        bg: authColors.errorSurface,   border: authColors.errorBorder   },
  already_claimed:{ label: "USN already claimed",  color: authColors.error,        bg: authColors.errorSurface,   border: authColors.errorBorder   },
  pending_review: { label: "Pending review",       color: "#92400E",               bg: "#FFFBEB",                 border: "#FDE68A"                },
};

function UsnStatusBadge({ status }: { status: NonNullable<UsnVerificationStatus> }) {
  const cfg = usnStatusConfig[status];
  return (
    <p
      className="mt-1.5 text-xs font-medium px-2.5 py-1 rounded-full inline-block"
      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}
    >
      {cfg.label}
    </p>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs" style={{ color: authColors.error }}>{message}</p>;
}

// ── Spinner ───────────────────────────────────────────────────────────────────
function ButtonSpinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

// Shared input / select style
const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.625rem 0.875rem",
  border: `1.5px solid ${authColors.border}`,
  borderRadius: authRadius.md,
  background: "#fff",
  color: authColors.text,
  fontSize: "0.9375rem",
  fontFamily: "'Inter', sans-serif",
  boxShadow: authShadow.input,
  outline: "none",
  transition: "border-color 0.15s",
};

const lockedFieldStyle: React.CSSProperties = {
  ...fieldStyle,
  background: authColors.accentMuted,
  color: authColors.textMuted,
  cursor: "not-allowed",
};

// ── Component ─────────────────────────────────────────────────────────────────
export function RegistrationForm({
  initialName,
  email,
  onSubmit,
  isSubmitting,
  errorMessage,
  usnVerificationStatus = null,
}: RegistrationFormProps) {
  const [fullName, setFullName] = useState(initialName);
  const [usn, setUsn] = useState("");
  const [department, setDepartment] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [touched, setTouched] = useState({ fullName: false, usn: false, department: false, academicYear: false });

  const errors = {
    fullName:     touched.fullName     && fullName.trim().length < 2   ? "Please enter your full name."            : "",
    usn:          touched.usn          && usn.trim().length < 5        ? "Please enter a valid USN."               : "",
    department:   touched.department   && !department                  ? "Please select your department."          : "",
    academicYear: touched.academicYear && !academicYear                ? "Please select your academic year."       : "",
  };

  const hasErrors = Object.values(errors).some(Boolean);

  const handleUsnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsn(e.target.value.toUpperCase().replace(/\s/g, ""));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, usn: true, department: true, academicYear: true });
    if (hasErrors) return;
    onSubmit({ fullName: fullName.trim(), usn, department, academicYear });
  };

  return (
    <div
      className="min-h-screen flex items-start justify-center px-4 py-10 md:py-16"
      style={{ background: authColors.background, fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
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
          <h1 className="text-2xl font-bold text-slate-800 mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Complete your profile
          </h1>
          <p className="text-sm mb-7" style={{ color: authColors.textMuted }}>
            We need a few details to verify your college identity.
          </p>

          {/* Generic error banner */}
          {errorMessage && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2 px-4 py-3 text-sm rounded-lg"
              style={{ background: authColors.errorSurface, border: `1px solid ${authColors.errorBorder}`, color: authColors.error, borderRadius: authRadius.md }}
            >
              <svg className="h-4 w-4 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10A8 8 0 112 10a8 8 0 0116 0zm-8-3a1 1 0 00-1 1v2a1 1 0 002 0V8a1 1 0 00-1-1zm0 6a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Full name */}
            <div>
              <label htmlFor="reg-fullname" className="block text-sm font-medium mb-1.5" style={{ color: authColors.text }}>
                Full name
              </label>
              <input
                id="reg-fullname"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
                autoComplete="name"
                style={fieldStyle}
                placeholder="As on your college ID"
                aria-describedby={errors.fullName ? "err-fullname" : undefined}
                aria-invalid={!!errors.fullName}
              />
              <FieldError message={errors.fullName} />
            </div>

            {/* Email — locked */}
            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium mb-1.5" style={{ color: authColors.text }}>
                Email
                <span className="ml-2 text-xs font-normal px-1.5 py-0.5 rounded" style={{ background: authColors.accentMuted, color: authColors.textMuted }}>
                  from Google
                </span>
              </label>
              <div className="relative">
                <input
                  id="reg-email"
                  type="email"
                  value={email}
                  readOnly
                  aria-readonly="true"
                  style={lockedFieldStyle}
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: authColors.textLight }} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* USN */}
            <div>
              <label htmlFor="reg-usn" className="block text-sm font-medium mb-1.5" style={{ color: authColors.text }}>
                USN (University Seat Number)
              </label>
              <input
                id="reg-usn"
                type="text"
                value={usn}
                onChange={handleUsnChange}
                onBlur={() => setTouched((t) => ({ ...t, usn: true }))}
                autoComplete="off"
                placeholder="e.g. 1XX21CS000"
                style={{ ...fieldStyle, fontFamily: "monospace", letterSpacing: "0.05em" }}
                aria-describedby={errors.usn ? "err-usn" : undefined}
                aria-invalid={!!errors.usn}
              />
              <FieldError message={errors.usn} />
              {usnVerificationStatus && <UsnStatusBadge status={usnVerificationStatus} />}
            </div>

            {/* Department */}
            <div>
              <label htmlFor="reg-department" className="block text-sm font-medium mb-1.5" style={{ color: authColors.text }}>
                Department
              </label>
              <select
                id="reg-department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, department: true }))}
                style={fieldStyle}
                aria-invalid={!!errors.department}
              >
                <option value="">Select department</option>
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <FieldError message={errors.department} />
            </div>

            {/* Academic year */}
            <div>
              <label htmlFor="reg-year" className="block text-sm font-medium mb-1.5" style={{ color: authColors.text }}>
                Academic year
              </label>
              <select
                id="reg-year"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, academicYear: true }))}
                style={fieldStyle}
                aria-invalid={!!errors.academicYear}
              >
                <option value="">Select year</option>
                {ACADEMIC_YEARS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <FieldError message={errors.academicYear} />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 font-semibold transition-opacity disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{
                background: authColors.gold,
                color: "#1a1a2e",
                borderRadius: authRadius.md,
                fontSize: "0.9375rem",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                border: "none",
              }}
            >
              {isSubmitting && <ButtonSpinner />}
              <span>{isSubmitting ? "Submitting…" : "Submit for verification"}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
