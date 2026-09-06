export type SessionStatus = "PREPARING" | "SEARCHING" | "READY" | "ACTIVE" | "COMPLETED";

export type PreSessionGoal =
  "speak_more_comfortably" | "stop_overthinking" | "feel_more_confident" | "just_get_some_practice";

export type PreSessionFeeling =
  | "a_little_nervous"
  | "a_bit_unsure"
  | "somewhere_in_between"
  | "pretty_comfortable"
  | "feeling_confident";

export interface Session {
  id: string;
  participant_name: string;
  meeting_url: string;
  status: SessionStatus;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
  pre_session_goal: PreSessionGoal | null;
  pre_session_feeling: PreSessionFeeling | null;
}

export interface CreateSessionInput {
  participant_name: string;
  meeting_url: string;
}
