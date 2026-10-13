import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../../lib/supabase";

export type AuthUser = {
  name: string;
  email: string;
};

export type AuthProfile = {
  full_name: string | null;
  email: string | null;
  email_status: string | null;
  role: string | null;
  usn_status: string | null;
  account_status: string | null;
};

export type AccountStatus = "none" | "pending" | "approved" | "rejected";

export type RegistrationPayload = {
  fullName: string;
  usn: string;
  department: string;
  academicYear: string;
};

export type RegistrationResult =
  | "verified"
  | "mismatch"
  | "not_found"
  | "already_claimed"
  | "manual_review";

function isRegistrationResult(value: unknown): value is RegistrationResult {
  return value === "verified"
    || value === "mismatch"
    || value === "not_found"
    || value === "already_claimed"
    || value === "manual_review";
}

type AuthState = {
  user: AuthUser | null;
  profile: AuthProfile | null;
  accountStatus: AccountStatus;
  role: string | null;
  isInitialising: boolean;
  isProfileLoading: boolean;
  isLoading: boolean;
  loginError: string | undefined;
  registrationError: string | undefined;
  registrationResult: RegistrationResult | undefined;
  isRegistrationSubmitting: boolean;
  signInWithGoogle: () => Promise<void>;
  submitRegistration: (registration: RegistrationPayload) => Promise<void>;
  logout: () => Promise<void>;
};

function accountStatusFromProfile(profile: AuthProfile | null): AccountStatus {
  if (!profile || profile.usn_status === "not_submitted") return "none";
  if (profile.account_status === "pending") return "pending";
  if (profile.account_status === "rejected") return "rejected";
  if (profile.account_status === "approved") return "approved";
  return "none";
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [accountStatus, setAccountStatus] = useState<AccountStatus>("none");
  const [role, setRole] = useState<string | null>(null);
  const [isInitialising, setIsInitialising] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string>();
  const [registrationError, setRegistrationError] = useState<string>();
  const [registrationResult, setRegistrationResult] = useState<RegistrationResult>();
  const [isRegistrationSubmitting, setIsRegistrationSubmitting] = useState(false);
  const sessionReadId = useRef(0);

  const resolveSession = useCallback(async (session: Session | null) => {
    const readId = ++sessionReadId.current;
    setLoginError(undefined);

    if (!session) {
      setUser(null);
      setProfile(null);
      setAccountStatus("none");
      setRole(null);
      setIsProfileLoading(false);
      return;
    }

    setIsProfileLoading(true);
    const fallbackUser: AuthUser = {
      name: session.user.user_metadata?.full_name ?? session.user.email ?? "User",
      email: session.user.email ?? "",
    };

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, email, email_status, role, usn_status, account_status")
        .eq("id", session.user.id)
        .maybeSingle();

      if (readId !== sessionReadId.current) return;
      if (error) {
        console.error("[auth] Could not load profile:", error.message);
        setUser(null);
        setProfile(null);
        setAccountStatus("none");
        setRole(null);
        setLoginError(`Could not load your account profile: ${error.message}`);
        setIsProfileLoading(false);
        return;
      }

      const profileRow = data as AuthProfile | null;
      setProfile(profileRow);
      setUser({
        name: profileRow?.full_name ?? fallbackUser.name,
        email: profileRow?.email ?? fallbackUser.email,
      });
      setAccountStatus(accountStatusFromProfile(profileRow));
      setRole(profileRow?.role ?? null);
      setIsProfileLoading(false);
    } catch (error) {
      if (readId !== sessionReadId.current) return;
      const message = error instanceof Error ? error.message : "Unexpected profile request error.";
      console.error("[auth] Could not load profile:", message);
      setUser(null);
      setProfile(null);
      setAccountStatus("none");
      setRole(null);
      setLoginError(`Could not load your account profile: ${message}`);
      setIsProfileLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      void resolveSession(session).finally(() => {
        if (mounted) setIsInitialising(false);
      });
    });

    void supabase.auth.getSession()
      .then(({ data: { session }, error }) => {
        if (!mounted) return;
        if (error) {
          console.error("[auth] Could not read session:", error.message);
          setLoginError(`Could not restore your session: ${error.message}`);
          setUser(null);
          setProfile(null);
          setAccountStatus("none");
          setRole(null);
          setIsInitialising(false);
          return;
        }
        return resolveSession(session).finally(() => {
          if (mounted) setIsInitialising(false);
        });
      })
      .catch((error: unknown) => {
        if (!mounted) return;
        const message = error instanceof Error ? error.message : "Unexpected session request error.";
        console.error("[auth] Could not read session:", message);
        setLoginError(`Could not restore your session: ${message}`);
        setIsInitialising(false);
      });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [resolveSession]);

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    setLoginError(undefined);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
      if (error) setLoginError(error.message);
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : "Google sign-in could not be started.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const submitRegistration = useCallback(async (registration: RegistrationPayload) => {
    setIsRegistrationSubmitting(true);
    setRegistrationError(undefined);
    setRegistrationResult(undefined);

    try {
      const { data, error } = await supabase.rpc("submit_usn", {
        p_usn: registration.usn.trim().toUpperCase(),
        p_name: registration.fullName.trim(),
        p_dept: registration.department,
        p_year: Number(registration.academicYear),
      });

      if (error) {
        setRegistrationError(error.message);
        return;
      }

      if (!isRegistrationResult(data)) {
        setRegistrationError("The registration service returned an unexpected result. Please try again.");
        return;
      }

      setRegistrationResult(data);
      if (data === "verified" || data === "manual_review") {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          setRegistrationError(`Could not refresh your account: ${sessionError.message}`);
          return;
        }
        await resolveSession(sessionData.session);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected registration error.";
      setRegistrationError(message);
    } finally {
      setIsRegistrationSubmitting(false);
    }
  }, [resolveSession]);

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("[auth] Could not sign out:", error.message);
      setLoginError(error.message);
      return;
    }
    setUser(null);
    setProfile(null);
    setAccountStatus("none");
    setRole(null);
    setLoginError(undefined);
    setRegistrationError(undefined);
    setRegistrationResult(undefined);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      accountStatus,
      role,
      isInitialising,
      isProfileLoading,
      isLoading,
      loginError,
      registrationError,
      registrationResult,
      isRegistrationSubmitting,
      signInWithGoogle,
      submitRegistration,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside <AuthProvider>");
  return context;
}
