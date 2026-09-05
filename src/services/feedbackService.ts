import { supabase, supabaseConfigured } from "@/lib/supabase";
import { FriendlyError } from "@/lib/errors";
import type { Feedback } from "@/types/feedback";

const COMFORT_LEVELS = [
  "very_comfortable",
  "comfortable",
  "neutral",
  "uncomfortable",
  "very_uncomfortable",
] as const;
const REPEAT_INTEREST = ["yes", "maybe", "no"] as const;

export async function submitFeedback(feedback: Feedback): Promise<void> {
  if (
    !supabaseConfigured ||
    !feedback.session_id ||
    !Number.isInteger(feedback.rating) ||
    feedback.rating < 1 ||
    feedback.rating > 5 ||
    !COMFORT_LEVELS.includes(feedback.comfort_level) ||
    !REPEAT_INTEREST.includes(feedback.repeat_interest) ||
    (feedback.comment?.length ?? 0) > 1000
  ) {
    throw new FriendlyError("We couldn't save your feedback. Please try again.");
  }

  const { error } = await supabase.from("feedback").insert({
    session_id: feedback.session_id,
    rating: feedback.rating,
    comfort_level: feedback.comfort_level,
    repeat_interest: feedback.repeat_interest,
    comment: feedback.comment,
  });
  if (error) throw new FriendlyError("We couldn't save your feedback. Please try again.");
}
