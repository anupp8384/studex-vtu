import {
  createContext, useContext, useState, useEffect, type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

// ── Types ─────────────────────────────────────────────────────────────────────
export type AuthUser = {
  name: string;
  email: string;
};

export type AccountStatus =
  | "none"       // signed in but no registration row yet (usn_status = 'not_submitted')
  | "pending"    // registration submitted, awaiting admin approval
  | "approved"   // fully approved
  | "rejected";  // admin rejected the account

export type RegistrationPayload = {
  fullName: string;
  usn: string;
  department: string;
  academicYear: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  accountStatus: AccountStatus;
  /** True while session is being resolved on initial load */
  isInitialising: boolean;
  /** True while a sign-in request is in flight */
  isLoading: boolean;
  loginError: string | undefined;
  registrationError: string | undefined;
  rejectionReason: string | undefined;
  isRequestingReview: boolean;
  signInWithGoogle: () => Promise<void>;
  /** TODO: wire this when the profiles table becomes writable by users */
  submitRegistration: (data: RegistrationPayload) => Promise<void>;
  logout: () => Promise<void>;
  requestReview: () => Promise<void>;
};

// ── Context ───────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

// ── Profile row shape (read-only for the browser) ─────────────────────────────
type ProfileRow = {
  account_status: string | null;
  usn_status: string | null;
  role: string | null;
  full_name: string | null;
  email: string | null;
  rejection_reason: string | null;
};

function statusFromProfile(profile: ProfileRow | null): AccountStatus {
  if (!profile) return "none";
  if (profile.usn_status === "not_submitted") return "none";
  if (profile.account_status === "approved") return "approved";
  if (profile.account_status === "rejected") return "rejected";
  return "pending"; // 'pending' or anything else defaults to pending
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accountStatus, setAccountStatus] = useState<AccountStatus>("none");
  const [rejectionReason, setRejectionReason] = useState<string | undefined>();
  const [isInitialising, setIsInitialising] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | undefined>();
  const [registrationError, setRegistrationError] = useState<string | undefined>();
  const [isRequestingReview, setIsRequestingReview] = useState(false);

  // ── Resolve profile from Supabase ─────────────────────────────────────────
  async function resolveSession(session: Session | null) {
    if (!session) {
      setUser(null);
      setAccountStatus("none");
      setRejectionReason(undefined);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("account_status, usn_status, role, full_name, email, rejection_reason")
      .eq("id", session.user.id)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows found — treat as not_submitted
      console.error("[auth] profiles fetch error:", error.message);
    }

    const profile = (data as ProfileRow | null) ?? null;
    const status = statusFromProfile(profile);

    setUser({
      name:  profile?.full_name  ?? session.user.user_metadata?.full_name ?? session.user.email ?? "User",
      email: profile?.email      ?? session.user.email ?? "",
    });
    setAccountStatus(status);
    setRejectionReason(profile?.rejection_reason ?? undefined);
  }

  // ── Bootstrap: read existing session then subscribe to changes ────────────
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) resolveSession(session).finally(() => setIsInitialising(false));
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) resolveSession(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── signInWithGoogle ──────────────────────────────────────────────────────
  async function signInWithGoogle(): Promise<void> {
    setIsLoading(true);
    setLoginError(undefined);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    // If there is an error (e.g. provider not enabled) show it inline.
    // On success the browser navigates away; isLoading stays true until redirect.
    if (error) {
      setLoginError(error.message);
      setIsLoading(false);
    }
  }

  // ── submitRegistration ────────────────────────────────────────────────────
  // TODO: wire when the profiles table has a write policy for users, e.g.:
  //   await supabase.from("profiles").upsert({
  //     id: session.user.id,
  //     full_name: data.fullName,
  //     usn: data.usn,
  //     department: data.department,
  //     academic_year: data.academicYear,
  //     usn_status: "submitted",
  //     account_status: "pending",
  //   });
  async function submitRegistration(data: RegistrationPayload): Promise<void> {
    void data; // suppress unused warning
    setRegistrationError("Registration submission is not yet wired to the database.");
  }

  // ── logout ────────────────────────────────────────────────────────────────
  async function logout(): Promise<void> {
    await supabase.auth.signOut();
    // onAuthStateChange fires with null session and calls resolveSession(null)
  }

  // ── requestReview ─────────────────────────────────────────────────────────
  // TODO: insert a row into a review_requests table when that table exists
  async function requestReview(): Promise<void> {
    setIsRequestingReview(true);
    try {
      setIsRequestingReview(false);
    } finally {
      setIsRequestingReview(false);
    }
  }

  return (
    <AuthContext.Provider value={{
      user, accountStatus, isInitialising, isLoading,
      loginError, registrationError, rejectionReason,
      isRequestingReview,
      signInWithGoogle, submitRegistration, logout, requestReview,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
