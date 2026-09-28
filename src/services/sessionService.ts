import { supabase, supabaseConfigured } from "@/lib/supabase";
import { FriendlyError } from "@/lib/errors";
import { APP_EVENTS, logger } from "@/services/logger";
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
  logger.info(APP_EVENTS.SESSION_CREATION_STARTED, { source: "session_service" });
  try {
    requireConfiguration();
  } catch (error) {
    logger.error(APP_EVENTS.SESSION_CREATION_FAILED, { source: "session_service", error });
    throw error;
  }
  const { data, error } = await supabase
    .from("sessions")
    .insert({ participant_name: participantName, meeting_url: meetingUrl, status: "READY" })
    .select()
    .single();
  if (error || !data) {
    logger.error(APP_EVENTS.SESSION_CREATION_FAILED, {
      source: "session_service",
      error,
      metadata: { operation: "createSession", table: "sessions", status: "failed" },
    });
    handleError("We couldn't start your session. Please try again.");
  }
  logger.info(APP_EVENTS.SESSION_CREATED, {
    source: "session_service",
    sessionId: data.id,
    metadata: { status: data.status },
  });
  return data as Session;
}

export async function getSession(sessionId: string): Promise<Session> {
  try {
    requireConfiguration();
  } catch (error) {
    logger.error(APP_EVENTS.SESSION_FETCH_FAILED, { source: "session_service", sessionId, error });
    throw error;
  }
  const { data, error } = await supabase.from("sessions").select("*").eq("id", sessionId).single();
  if (error || !data) {
    logger.error(APP_EVENTS.SESSION_FETCH_FAILED, {
      source: "session_service",
      sessionId,
      error,
      metadata: { operation: "getSession", table: "sessions", status: "failed" },
    });
    handleError("Something went wrong while preparing your session.");
  }
  logger.info(APP_EVENTS.SESSION_FETCHED, {
    source: "session_service",
    sessionId,
    metadata: { status: data.status },
  });
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
  logger.info(APP_EVENTS.SESSION_ACTIVATION_STARTED, { source: "session_service", sessionId });
  let session: Session;
  try {
    session = await getSession(sessionId);
  } catch (error) {
    logger.error(APP_EVENTS.SESSION_ACTIVATION_FAILED, {
      source: "session_service",
      sessionId,
      error,
    });
    throw error;
  }
  if (session.status === "ACTIVE") return session;
  if (session.status === "COMPLETED") {
    logger.error(APP_EVENTS.SESSION_ACTIVATION_FAILED, {
      source: "session_service",
      sessionId,
      metadata: { operation: "activateSession", status: "completed" },
    });
    handleError("We couldn't join the conversation. Please try again.");
  }

  const { data, error } = await supabase
    .from("sessions")
    .update({ status: "ACTIVE", started_at: new Date().toISOString() })
    .eq("id", sessionId)
    .eq("status", "READY")
    .select()
    .single();
  if (error || !data) {
    logger.error(APP_EVENTS.SESSION_ACTIVATION_FAILED, {
      source: "session_service",
      sessionId,
      error,
      metadata: { operation: "activateSession", table: "sessions", status: "failed" },
    });
    handleError("We couldn't join the conversation. Please try again.");
  }
  logger.info(APP_EVENTS.SESSION_ACTIVATED, { source: "session_service", sessionId });
  return data as Session;
}

export async function completeSession(
  sessionId: string,
  completionReason: "timer" | "manual" | "unknown" = "unknown",
): Promise<Session> {
  logger.info(APP_EVENTS.SESSION_COMPLETION_STARTED, {
    source: "session_service",
    sessionId,
    metadata: { completion_reason: completionReason },
  });
  let session: Session;
  try {
    session = await getSession(sessionId);
  } catch (error) {
    logger.error(APP_EVENTS.SESSION_COMPLETION_FAILED, {
      source: "session_service",
      sessionId,
      error,
      metadata: { completion_reason: completionReason },
    });
    throw error;
  }
  if (session.status === "COMPLETED") return session;

  const { data, error } = await supabase
    .from("sessions")
    .update({ status: "COMPLETED", completed_at: session.completed_at ?? new Date().toISOString() })
    .eq("id", sessionId)
    .eq("status", "ACTIVE")
    .is("completed_at", null)
    .select()
    .single();
  if (error || !data) {
    logger.error(APP_EVENTS.SESSION_COMPLETION_FAILED, {
      source: "session_service",
      sessionId,
      error,
      metadata: {
        operation: "completeSession",
        table: "sessions",
        status: "failed",
        completion_reason: completionReason,
      },
    });
    handleError("We couldn't complete the session. Please try again.");
  }
  logger.info(APP_EVENTS.SESSION_COMPLETED, {
    source: "session_service",
    sessionId,
    metadata: { completion_reason: completionReason },
  });
  return data as Session;
}
