export type SessionStatus =
  | "PREPARING"
  | "SEARCHING"
  | "READY"
  | "ACTIVE"
  | "COMPLETED";

export interface Session {
  id: string;
  participant_name: string;
  meeting_url: string;
  status: SessionStatus;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface CreateSessionInput {
  participant_name: string;
  meeting_url: string;
}
