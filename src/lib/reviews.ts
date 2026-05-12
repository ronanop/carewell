import { existsSync, readFileSync } from "fs";
import { join } from "path";

export type ReviewSnapshot = {
  rating: string;
  reviewCount: string;
  reviews: { id: string; text: string; author: string }[];
};

const snapshotPath = () => join(process.cwd(), "data", "reviews-snapshot.json");

const fallback: ReviewSnapshot = {
  rating: "4.3",
  reviewCount: "120",
  reviews: [
    { id: "1", text: "Excellent care and clear explanations.", author: "Patient" },
    { id: "2", text: "Professional team from consultation to follow-up.", author: "Patient" },
    { id: "3", text: "Highly recommend for cosmetic procedures in Delhi.", author: "Patient" },
  ],
};

/** Single source for homepage reviews block + JSON-LD AggregateRating. */
export async function readReviewsSnapshot(): Promise<ReviewSnapshot> {
  const path = snapshotPath();
  if (existsSync(path)) {
    try {
      return JSON.parse(readFileSync(path, "utf8")) as ReviewSnapshot;
    } catch {
      /* fall through */
    }
  }
  const raw = process.env.GOOGLE_PLACES_JSON;
  if (raw) {
    try {
      return JSON.parse(raw) as ReviewSnapshot;
    } catch {
      /* fall through */
    }
  }
  return fallback;
}
