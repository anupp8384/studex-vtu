import { useState, type ChangeEvent, type FormEvent } from "react";
import logoImage from "../../imports/WhatsApp_Image_2026-05-28_at_5.04.56_PM.jpeg";
import { authColors, authCopy, authFonts, authRadius, authShadow, authSpacing } from "./auth-theme";

// ── Types ─────────────────────────────────────────────────────────────────────
export type RegistrationData = {
  fullName: string;
  usn: string;
  department: string;
  academicYear: string;
};

export type UsnVerificationResult = keyof typeof authCopy.verificationResults;

export type RegistrationFormProps = {
  /** Prefilled from Google profile, editable */
  initialName: string;
  /** Read-only — comes from Google auth */
  email: string;
  onSubmit: (data: RegistrationData) => void;
  isSubmitting: boolean;
  errorMessage?: string;
  verificationResult?: UsnVerificationResult;
};

function RegistrationFieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} className="mt-1 text-xs" style={{ color: authColors.error }}>{message}</p>;
}

// ── Spinner ───────────────────────────────────────────────────────────────────
function RegistrationButtonSpinner() {
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
  padding: `${authSpacing.controlY} ${authSpacing.controlX}`,
  border: `1.5px solid ${authColors.border}`,
  borderRadius: authRadius.md,
  background: "#fff",
  color: authColors.text,
  fontSize: "0.9375rem",
  fontFamily: "'Inter', sans-serif",
  boxShadow: authShadow.input,
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
  verificationResult,
}: RegistrationFormProps) {
  const [fullName, setFullName] = useState(initialName);
  const [usn, setUsn] = useState("");
  const [department, setDepartment] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [touched, setTouched] = useState({ fullName: false, usn: false, department: false, academicYear: false });

  const errors = {
    fullName:     touched.fullName     && fullName.trim().length < 2   ? authCopy.validationFullName      : "",
    usn:          touched.usn          && usn.trim().length < 5        ? authCopy.validationUsn            : "",
    department:   touched.department   && !department                  ? authCopy.validationDepartment     : "",
    academicYear: touched.academicYear && !academicYear                ? authCopy.validationYear            : "",
  };

  const handleUsnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsn(e.target.value.toUpperCase().replace(/\s/g, ""));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ fullName: true, usn: true, department: true, academicYear: true });
    if (
      fullName.trim().length < 2
      || usn.trim().length < 5
      || !department
      || !authCopy.academicYears.some((year) => year.value === academicYear)
    ) return;
    onSubmit({ fullName: fullName.trim(), usn: usn.trim().toUpperCase(), department, academicYear });
  };

  return (
    <div
      className="min-h-screen flex items-start justify-center"
      style={{
        background: authColors.background,
        fontFamily: authFonts.body,
        padding: `${authSpacing.pageY} ${authSpacing.pageX}`,
      }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center mb-8" style={{ gap: authSpacing.headerGap }}>
          <img src={logoImage} alt="Studex logo" className="h-9 w-auto object-contain" />
          <span className="text-xl font-bold text-slate-800" style={{ fontFamily: authFonts.heading }}>
            {authCopy.appName}
          </span>
        </div>

        <div
          className="p-6 sm:p-8"
          style={{
            background: authColors.surface,
            border: `1px solid ${authColors.border}`,
            borderRadius: authRadius.xl,
            boxShadow: authShadow.card,
            padding: authSpacing.cardPadding,
          }}
        >
          <h1 className="text-2xl font-bold text-slate-800 mb-1" style={{ fontFamily: authFonts.heading }}>
            {authCopy.registrationHeading}
          </h1>
          <p className="text-sm mb-7" style={{ color: authColors.textMuted }}>
            {authCopy.registrationDescription}
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

          {verificationResult && (
            <div
              role="status"
              className="mb-5 text-sm"
              style={{
                color: authColors.textMuted,
              }}
            >
              {authCopy.verificationResults[verificationResult]}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col"
            style={{ gap: authSpacing.fieldGap }}
          >
            {/* Full name */}
            <div>
              <label htmlFor="reg-fullname" className="block text-sm font-medium mb-1.5" style={{ color: authColors.text }}>
                {authCopy.registrationNameLabel}
              </label>
              <input
                id="reg-fullname"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, fullName: true }))}
                autoComplete="name"
                style={fieldStyle}
                className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B9BB8]"
                placeholder={authCopy.registrationNamePlaceholder}
                aria-describedby={errors.fullName ? "err-fullname" : undefined}
                aria-invalid={!!errors.fullName}
              />
              <RegistrationFieldError id="err-fullname" message={errors.fullName} />
            </div>

            {/* Email — locked */}
            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium mb-1.5" style={{ color: authColors.text }}>
                {authCopy.registrationEmailLabel}
                <span className="ml-2 text-xs font-normal px-1.5 py-0.5 rounded" style={{ background: authColors.accentMuted, color: authColors.textMuted }}>
                  {authCopy.registrationEmailSource}
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
                  className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B9BB8]"
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: authColors.textLight }} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* USN */}
            <div>
              <label htmlFor="reg-usn" className="block text-sm font-medium mb-1.5" style={{ color: authColors.text }}>
                {authCopy.registrationUsnLabel}
              </label>
              <input
                id="reg-usn"
                type="text"
                value={usn}
                onChange={handleUsnChange}
                onBlur={() => setTouched((t) => ({ ...t, usn: true }))}
                autoComplete="off"
                placeholder={authCopy.registrationUsnPlaceholder}
                style={{ ...fieldStyle, fontFamily: "monospace", letterSpacing: "0.05em" }}
                aria-describedby={errors.usn ? "err-usn" : undefined}
                aria-invalid={!!errors.usn}
                className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B9BB8]"
              />
              <RegistrationFieldError id="err-usn" message={errors.usn} />
            </div>

            {/* Department */}
            <div>
              <label htmlFor="reg-department" className="block text-sm font-medium mb-1.5" style={{ color: authColors.text }}>
                {authCopy.registrationDepartmentLabel}
              </label>
              <select
                id="reg-department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, department: true }))}
                style={fieldStyle}
                aria-invalid={!!errors.department}
                aria-describedby={errors.department ? "err-department" : undefined}
                className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B9BB8]"
              >
                <option value="">{authCopy.registrationDepartmentPlaceholder}</option>
                {authCopy.departments.map((departmentOption) => (
                  <option key={departmentOption.value} value={departmentOption.value}>{departmentOption.label}</option>
                ))}
              </select>
              <RegistrationFieldError id="err-department" message={errors.department} />
            </div>

            {/* Academic year */}
            <div>
              <label htmlFor="reg-year" className="block text-sm font-medium mb-1.5" style={{ color: authColors.text }}>
                {authCopy.registrationYearLabel}
              </label>
              <select
                id="reg-year"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, academicYear: true }))}
                style={fieldStyle}
                aria-invalid={!!errors.academicYear}
                aria-describedby={errors.academicYear ? "err-year" : undefined}
                className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B9BB8]"
              >
                <option value="">{authCopy.registrationYearPlaceholder}</option>
                {authCopy.academicYears.map((year) => (
                  <option key={year.value} value={year.value}>{year.label}</option>
                ))}
              </select>
              <RegistrationFieldError id="err-year" message={errors.academicYear} />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-5 font-semibold transition-opacity disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B9BB8]"
              style={{
                background: authColors.gold,
                color: "#1a1a2e",
                borderRadius: authRadius.md,
                fontSize: "0.9375rem",
                fontFamily: authFonts.heading,
                border: "none",
                minHeight: authSpacing.buttonMinHeight,
              }}
            >
              {isSubmitting && <RegistrationButtonSpinner />}
              <span>{isSubmitting ? authCopy.registrationSubmitting : authCopy.registrationSubmit}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
