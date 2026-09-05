export type ComfortLevel =
  | "very_comfortable"
  | "comfortable"
  | "neutral"
  | "uncomfortable"
  | "very_uncomfortable";

export type RepeatInterest = "yes" | "maybe" | "no";

export interface Feedback {
  session_id: string;
  rating: number;
  comfort_level: ComfortLevel;
  repeat_interest: RepeatInterest;
  comment: string | null;
}
