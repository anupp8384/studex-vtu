import { createContext, useContext, useState, type ReactNode } from "react";

export type PointEvent = {
  id: string;
  label: string;
  points: number;
  type: "upload" | "rating_bonus";
  date: string;
};

type PointsContextType = {
  totalPoints: number;
  history: PointEvent[];
  addUploadPoints: () => void;
  addRatingBonus: (resourceTitle?: string) => void;
  // rating system
  rateResource: (resourceId: string, resourceTitle: string, stars: number) => void;
  getRatingInfo: (resourceId: string, baseRating: number) => { avg: number; count: number; userRating: number | null };
};

const PointsContext = createContext<PointsContextType | null>(null);

export function PointsProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<PointEvent[]>([]);
  // resourceId -> array of submitted star ratings (1–5)
  const [ratings, setRatings] = useState<Record<string, number[]>>({});
  // resourceId -> whether bonus has already been awarded
  const [bonusAwarded, setBonusAwarded] = useState<Set<string>>(new Set());
  // resourceId -> this user's submitted star rating
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});

  const totalPoints = history.reduce((sum, e) => sum + e.points, 0);

  const addUploadPoints = () => {
    setHistory((prev) => [
      {
        id: crypto.randomUUID(),
        label: "Upload: New Resource",
        points: 40,
        type: "upload",
        date: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
  };

  const addRatingBonus = (resourceTitle = "Your resource") => {
    setHistory((prev) => [
      {
        id: crypto.randomUUID(),
        label: `Rating bonus: ${resourceTitle}`,
        points: 10,
        type: "rating_bonus",
        date: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
  };

  const rateResource = (resourceId: string, resourceTitle: string, stars: number) => {
    const prev = userRatings[resourceId];

    setUserRatings((u) => ({ ...u, [resourceId]: stars }));

    setRatings((r) => {
      const existing = r[resourceId] ?? [];
      // replace previous user rating if already rated, otherwise append
      const updated = prev !== undefined
        ? existing.map((v, i) => (i === existing.length - 1 && v === prev ? stars : v))
        : [...existing, stars];
      return { ...r, [resourceId]: updated };
    });

    // check bonus: avg of all submitted ratings >= 3.5 stars (= 7/10)
    setRatings((r) => {
      const all = r[resourceId] ?? [];
      const avg = all.length ? all.reduce((s, v) => s + v, 0) / all.length : stars;
      if (avg >= 3.5 && !bonusAwarded.has(resourceId)) {
        setBonusAwarded((b) => new Set([...b, resourceId]));
        setHistory((h) => [
          {
            id: crypto.randomUUID(),
            label: `Rating bonus: ${resourceTitle}`,
            points: 10,
            type: "rating_bonus",
            date: new Date().toISOString().split("T")[0],
          },
          ...h,
        ]);
      }
      return r;
    });
  };

  const getRatingInfo = (resourceId: string, baseRating: number) => {
    const submitted = ratings[resourceId] ?? [];
    // blend mock base rating (treated as 20 prior votes) with live ratings
    const priorVotes = 20;
    const total = baseRating * priorVotes + submitted.reduce((s, v) => s + v, 0);
    const count = priorVotes + submitted.length;
    const avg = total / count;
    return { avg, count, userRating: userRatings[resourceId] ?? null };
  };

  return (
    <PointsContext.Provider value={{ totalPoints, history, addUploadPoints, addRatingBonus, rateResource, getRatingInfo }}>
      {children}
    </PointsContext.Provider>
  );
}

export function usePoints() {
  const ctx = useContext(PointsContext);
  if (!ctx) throw new Error("usePoints must be used inside PointsProvider");
  return ctx;
}
