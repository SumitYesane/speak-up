export type PostSessionFeeling =
  | "quite_nervous"
  | "a_little_nervous"
  | "somewhere_in_between"
  | "pretty_comfortable"
  | "very_comfortable";

export type PostSessionChallenge =
  | "finding_right_words"
  | "starting_a_thought"
  | "keeping_conversation_going"
  | "not_overthinking"
  | "speaking_confidently"
  | "nothing_in_particular";

export type RepeatIntention = "yes" | "maybe" | "not_now";

export interface Feedback {
  session_id: string;
  post_session_feeling: PostSessionFeeling;
  post_session_challenge: PostSessionChallenge;
  repeat_intention: RepeatIntention;
  optional_feedback: string | null;
}
