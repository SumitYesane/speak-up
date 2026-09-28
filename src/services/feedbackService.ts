import { supabase, supabaseConfigured } from "@/lib/supabase";
import { FriendlyError } from "@/lib/errors";
import { APP_EVENTS, logger } from "@/services/logger";
import type { Feedback } from "@/types/feedback";

const FEELINGS = [
  "quite_nervous",
  "a_little_nervous",
  "somewhere_in_between",
  "pretty_comfortable",
  "very_comfortable",
] as const;
const CHALLENGES = [
  "finding_right_words",
  "starting_a_thought",
  "keeping_conversation_going",
  "not_overthinking",
  "speaking_confidently",
  "nothing_in_particular",
] as const;
const REPEAT_INTENTIONS = ["yes", "maybe", "not_now"] as const;

export async function submitFeedback(feedback: Feedback): Promise<void> {
  logger.info(APP_EVENTS.FEEDBACK_SUBMISSION_STARTED, {
    source: "feedback_service",
    sessionId: feedback.session_id,
  });
  if (
    !supabaseConfigured ||
    !feedback.session_id ||
    !FEELINGS.includes(feedback.post_session_feeling) ||
    !CHALLENGES.includes(feedback.post_session_challenge) ||
    !REPEAT_INTENTIONS.includes(feedback.repeat_intention) ||
    (feedback.optional_feedback?.length ?? 0) > 400
  ) {
    logger.error(APP_EVENTS.FEEDBACK_SUBMISSION_FAILED, {
      source: "feedback_service",
      sessionId: feedback.session_id,
      metadata: { operation: "submitFeedback", table: "feedback", status: "validation_failed" },
    });
    throw new FriendlyError("We couldn't save your feedback. Please try again.");
  }

  const { error } = await supabase.from("feedback").insert({
    session_id: feedback.session_id,
    post_session_feeling: feedback.post_session_feeling,
    post_session_challenge: feedback.post_session_challenge,
    repeat_intention: feedback.repeat_intention,
    optional_feedback: feedback.optional_feedback,
  });
  if (error) {
    logger.error(APP_EVENTS.FEEDBACK_SUBMISSION_FAILED, {
      source: "feedback_service",
      sessionId: feedback.session_id,
      error,
      metadata: { operation: "submitFeedback", table: "feedback", status: "failed" },
    });
    throw new FriendlyError("We couldn't save your feedback. Please try again.");
  }
  logger.info(APP_EVENTS.FEEDBACK_SUBMITTED, {
    source: "feedback_service",
    sessionId: feedback.session_id,
    metadata: {
      post_session_feeling: feedback.post_session_feeling,
      post_session_challenge: feedback.post_session_challenge,
      repeat_intention: feedback.repeat_intention,
    },
  });
}
