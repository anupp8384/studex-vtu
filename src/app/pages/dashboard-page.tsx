import { Card } from "../components/ui/card";
import { useAuth } from "../context/auth-context";

function StatusChip({ label, value }: { label: string; value: string | null | undefined }) {
  const normalizedValue = value || "unknown";
  const tone = normalizedValue === "approved" || normalizedValue === "verified"
    ? "bg-emerald-100 text-emerald-800"
    : normalizedValue === "rejected"
      ? "bg-rose-100 text-rose-800"
      : "bg-amber-100 text-amber-800";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${tone}`}>
      <span className="font-medium">{label}:</span>
      <span>{normalizedValue.replaceAll("_", " ")}</span>
    </span>
  );
}

export function DashboardPage() {
  const { profile, accountStatus, user } = useAuth();
  const name = user?.name ?? "Student";
  const email = user?.email ?? "—";

  return (
    <section className="min-h-[70vh] bg-[#FBFAF5] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">My account</p>
          <h1 className="text-3xl font-bold text-slate-800">My dashboard</h1>
        </header>
        <Card className="gap-5 border-[#D6E8F0] bg-white p-6 sm:p-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">{name}</h2>
            <p className="mt-1 text-slate-600">{email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusChip label="Email" value={profile?.email_status} />
            <StatusChip label="USN" value={profile?.usn_status} />
            <StatusChip label="Account" value={accountStatus} />
          </div>
        </Card>
      </div>
    </section>
  );
}
