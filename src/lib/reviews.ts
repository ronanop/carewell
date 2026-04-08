export type ReviewSnapshot = {
  rating: string;
  reviewCount: string;
  reviews: { id: string; text: string; author: string }[];
};

const fallback: ReviewSnapshot = {
  rating: "4.9",
  reviewCount: "120",
  reviews: [
    { id: "1", text: "Excellent care and clear explanations.", author: "Patient" },
    { id: "2", text: "Professional team from consultation to follow-up.", author: "Patient" },
    { id: "3", text: "Highly recommend for cosmetic procedures in Delhi.", author: "Patient" },
  ],
};

export async function readReviewsSnapshot(): Promise<ReviewSnapshot> {
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
