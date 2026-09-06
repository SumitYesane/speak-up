import { supabase, supabaseConfigured } from "@/lib/supabase";
import { FriendlyError } from "@/lib/errors";
import type { PreSessionFeeling, PreSessionGoal, Session } from "@/types/session";

const meetingUrl = import.meta.env["VITE_MEETING_URL"] ?? "";

function requireConfiguration() {
  if (!supabaseConfigured || !meetingUrl) {
    throw new FriendlyError("We couldn't start your session. Please try again.");
  }
}

function handleError(message: string): never {
  throw new FriendlyError(message);
}

export async function createSession(participantName: string): Promise<Session> {
  requireConfiguration();
  const { data, error } = await supabase
    .from("sessions")
    .insert({ participant_name: participantName, meeting_url: meetingUrl, status: "READY" })
    .select()
    .single();
  if (error || !data) handleError("We couldn't start your session. Please try again.");
  return data as Session;
}

export async function getSession(sessionId: string): Promise<Session> {
  requireConfiguration();
  const { data, error } = await supabase.from("sessions").select("*").eq("id", sessionId).single();
  if (error || !data) handleError("Something went wrong while preparing your session.");
  return data as Session;
}

export async function savePreSessionReflection(
  sessionId: string,
  goal: PreSessionGoal,
  feeling: PreSessionFeeling,
): Promise<Session> {
  requireConfiguration();
  const { data, error } = await supabase
    .from("sessions")
    .update({ pre_session_goal: goal, pre_session_feeling: feeling })
    .eq("id", sessionId)
    .eq("status", "READY")
    .select()
    .single();
  if (error || !data) handleError("We couldn't save your reflection. Please try again.");
  return data as Session;
}

export async function activateSession(sessionId: string): Promise<Session> {
  const session = await getSession(sessionId);
  if (session.status === "ACTIVE") return session;
  if (session.status === "COMPLETED") {
    handleError("We couldn't join the conversation. Please try again.");
  }

  const { data, error } = await supabase
    .from("sessions")
    .update({ status: "ACTIVE", started_at: new Date().toISOString() })
    .eq("id", sessionId)
    .eq("status", "READY")
    .select()
    .single();
  if (error || !data) handleError("We couldn't join the conversation. Please try again.");
  return data as Session;
}

export async function completeSession(sessionId: string): Promise<Session> {
  const session = await getSession(sessionId);
  if (session.status === "COMPLETED") return session;

  const { data, error } = await supabase
    .from("sessions")
    .update({ status: "COMPLETED", completed_at: session.completed_at ?? new Date().toISOString() })
    .eq("id", sessionId)
    .eq("status", "ACTIVE")
    .is("completed_at", null)
    .select()
    .single();
  if (error || !data) handleError("We couldn't complete the session. Please try again.");
  return data as Session;
}
