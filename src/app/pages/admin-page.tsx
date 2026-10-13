import { useCallback, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import { supabase } from "../../lib/supabase";

type AccountStatus = "pending" | "approved" | "rejected";
type AdminTab = AccountStatus;
type Decision = Exclude<AccountStatus, "pending">;

type ProfileRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  email_status: string | null;
  usn_status: string | null;
  account_status: string | null;
  created_at: string | null;
};

type UsnClaimRow = {
  usn: string;
  user_id: string;
  result: string | null;
  submitted_department: string | null;
  submitted_year: number | string | null;
};

type StudentRow = ProfileRow & {
  claim: UsnClaimRow | null;
};

type Feedback = {
  kind: "success" | "error";
  message: string;
};

const TAB_LABELS: Record<AdminTab, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
};

function displayValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") return "—";
  return String(value).replaceAll("_", " ");
}

function formatRegistrationDate(value: string | null): string {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function StatusChip({ value, verified }: { value: string; verified?: boolean }) {
  const isPositive = verified ?? (value === "approved" || value === "Verified");
  const colorClass = isPositive
    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
    : "border-amber-200 bg-amber-50 text-amber-800";

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${colorClass}`}>
      {value}
    </span>
  );
}

function needsApprovalException(student: StudentRow): boolean {
  return student.email_status !== "verified"
    || (student.usn_status !== "verified" && student.usn_status !== "manual_review");
}

export function AdminPage() {
  const [students, setStudents] = useState<StudentRow[]>([]);
  const [activeTab, setActiveTab] = useState<AdminTab>("pending");
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setLoadingError] = useState<string>();
  const [feedback, setFeedback] = useState<Feedback>();
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [exceptionReasons, setExceptionReasons] = useState<Record<string, string>>({});
  const [processingUserId, setProcessingUserId] = useState<string>();

  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    setLoadingError(undefined);

    try {
      const [profilesResponse, claimsResponse] = await Promise.all([
        supabase
          .from("profiles")
          .select("id, full_name, email, email_status, usn_status, account_status, created_at")
          .order("created_at", { ascending: false }),
        supabase
          .from("usn_claims")
          .select("usn, user_id, result, submitted_department, submitted_year"),
      ]);

      if (profilesResponse.error) {
        setLoadingError(`Could not load student profiles: ${profilesResponse.error.message}`);
        setIsLoading(false);
        return false;
      }

      if (claimsResponse.error) {
        setLoadingError(`Could not load USN submissions: ${claimsResponse.error.message}`);
        setIsLoading(false);
        return false;
      }

      const claimsByUser = new Map<string, UsnClaimRow>();
      for (const claim of (claimsResponse.data ?? []) as UsnClaimRow[]) {
        claimsByUser.set(claim.user_id, claim);
      }

      setStudents(
        ((profilesResponse.data ?? []) as ProfileRow[]).map((profile) => ({
          ...profile,
          claim: claimsByUser.get(profile.id) ?? null,
        })),
      );
      setIsLoading(false);
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected request error.";
      setLoadingError(`Could not load students: ${message}`);
      setIsLoading(false);
      return false;
    }
  }, []);

  useEffect(() => {
    void fetchStudents();
  }, [fetchStudents]);

  const handleDecision = async (student: StudentRow, decision: Decision) => {
    const note = notes[student.id]?.trim() ?? "";
    const exceptionReason = exceptionReasons[student.id]?.trim() ?? "";

    if (decision === "approved" && needsApprovalException(student) && !exceptionReason) {
      setFeedback({ kind: "error", message: "Add an exception reason before approving this student." });
      return;
    }

    setProcessingUserId(student.id);
    setFeedback(undefined);

    try {
      const { error } = await supabase.rpc("admin_decide", {
        p_user: student.id,
        p_decision: decision,
        p_note: note || null,
        p_exception_reason: exceptionReason || null,
      });

      if (error) {
        setFeedback({ kind: "error", message: `Could not ${decision} student: ${error.message}` });
        return;
      }

      const refreshed = await fetchStudents();
      if (!refreshed) {
        setFeedback({
          kind: "error",
          message: `${decision === "approved" ? "Approved" : "Rejected"} student, but the student list could not be refreshed.`,
        });
        return;
      }

      setNotes((current) => {
        const next = { ...current };
        delete next[student.id];
        return next;
      });
      setExceptionReasons((current) => {
        const next = { ...current };
        delete next[student.id];
        return next;
      });
      setFeedback({
        kind: "success",
        message: `Student ${decision === "approved" ? "approved" : "rejected"} successfully.`,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected error.";
      setFeedback({ kind: "error", message: `Could not ${decision} student: ${message}` });
    } finally {
      setProcessingUserId(undefined);
    }
  };

  return (
    <main className="min-h-screen bg-[#FBFAF5] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-7">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Studex administration</p>
          <h1 className="text-3xl font-bold text-slate-800">Student approvals</h1>
          <p className="mt-2 text-sm text-slate-600">Review student details and approve or reject account requests.</p>
        </header>

        {feedback && (
          <div
            role={feedback.kind === "error" ? "alert" : "status"}
            className={`mb-5 flex items-start gap-2 rounded-lg border px-4 py-3 text-sm ${
              feedback.kind === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-rose-200 bg-rose-50 text-rose-800"
            }`}
          >
            {feedback.kind === "success"
              ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />}
            <span>{feedback.message}</span>
          </div>
        )}

        {loadingError && (
          <div role="alert" className="mb-5 flex items-start gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{loadingError}</span>
            <Button variant="outline" size="sm" className="ml-auto shrink-0" onClick={() => void fetchStudents()}>
              Retry
            </Button>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as AdminTab)}>
          <TabsList className="mb-5">
            {(Object.keys(TAB_LABELS) as AdminTab[]).map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {TAB_LABELS[tab]}
                <span className="ml-2 text-xs text-slate-500">
                  {students.filter((student) => student.account_status === tab).length}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {(Object.keys(TAB_LABELS) as AdminTab[]).map((tab) => {
            const tabStudents = students.filter((student) => student.account_status === tab);
            return (
              <TabsContent key={tab} value={tab}>
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2 py-16 text-sm text-slate-600" role="status">
                    <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Loading students…
                  </div>
                ) : tabStudents.length === 0 ? (
                  <Card className="border-[#D6E8F0] bg-white p-8 text-center text-slate-600">
                    {tab === "pending" ? "No pending students" : `No ${tab} students`}
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {tabStudents.map((student) => (
                      <StudentCard
                        key={student.id}
                        student={student}
                        isPending={tab === "pending"}
                        isProcessing={processingUserId === student.id}
                        note={notes[student.id] ?? ""}
                        exceptionReason={exceptionReasons[student.id] ?? ""}
                        requiresException={needsApprovalException(student)}
                        onNoteChange={(value) => setNotes((current) => ({ ...current, [student.id]: value }))}
                        onExceptionReasonChange={(value) => setExceptionReasons((current) => ({ ...current, [student.id]: value }))}
                        onDecision={(decision) => void handleDecision(student, decision)}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </main>
  );
}

function StudentCard({
  student,
  isPending,
  isProcessing,
  note,
  exceptionReason,
  requiresException,
  onNoteChange,
  onExceptionReasonChange,
  onDecision,
}: {
  student: StudentRow;
  isPending: boolean;
  isProcessing: boolean;
  note: string;
  exceptionReason: string;
  requiresException: boolean;
  onNoteChange: (value: string) => void;
  onExceptionReasonChange: (value: string) => void;
  onDecision: (decision: Decision) => void;
}) {
  return (
    <Card className="border-[#D6E8F0] bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-slate-800">{displayValue(student.full_name)}</h2>
            <StatusChip
              value={student.email_status === "verified" ? "Verified" : "Unverified"}
              verified={student.email_status === "verified"}
            />
          </div>
          <p className="mt-1 break-all text-sm text-slate-600">{displayValue(student.email)}</p>

          <dl className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 text-sm sm:grid-cols-2 xl:grid-cols-3">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">USN</dt>
              <dd className="mt-1 flex flex-wrap items-center gap-2 font-medium text-slate-800">
                {displayValue(student.claim?.usn)}
                <StatusChip value={displayValue(student.claim?.result ?? student.usn_status)} verified={student.usn_status === "verified"} />
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Department</dt>
              <dd className="mt-1 text-slate-800">{displayValue(student.claim?.submitted_department)}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Year</dt>
              <dd className="mt-1 text-slate-800">{displayValue(student.claim?.submitted_year)}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Registration date</dt>
              <dd className="mt-1 text-slate-800">{formatRegistrationDate(student.created_at)}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Account status</dt>
              <dd className="mt-1">
                <StatusChip value={displayValue(student.account_status)} />
              </dd>
            </div>
          </dl>
        </div>

        {isPending && (
          <div className="w-full space-y-3 lg:max-w-sm">
            <div>
              <label htmlFor={`admin-note-${student.id}`} className="mb-1.5 block text-xs font-medium text-slate-700">
                Note <span className="font-normal text-slate-500">(optional)</span>
              </label>
              <Textarea
                id={`admin-note-${student.id}`}
                value={note}
                onChange={(event) => onNoteChange(event.target.value)}
                placeholder="Add an optional note"
                rows={2}
                disabled={isProcessing}
              />
            </div>
            {requiresException && (
              <div>
                <label htmlFor={`admin-exception-${student.id}`} className="mb-1.5 block text-xs font-medium text-slate-700">
                  Exception reason <span className="text-rose-600">(required to approve)</span>
                </label>
                <Textarea
                  id={`admin-exception-${student.id}`}
                  value={exceptionReason}
                  onChange={(event) => onExceptionReasonChange(event.target.value)}
                  placeholder="Explain why this account may be approved"
                  rows={2}
                  disabled={isProcessing}
                />
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              <Button
                className="bg-[#FFBF00] text-slate-900 hover:bg-[#FFBF00]/90"
                onClick={() => onDecision("approved")}
                disabled={isProcessing}
              >
                {isProcessing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
                Approve
              </Button>
              <Button variant="outline" onClick={() => onDecision("rejected")} disabled={isProcessing}>
                Reject
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
