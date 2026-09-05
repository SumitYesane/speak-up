import type { Session, SessionStatus } from "@/types/session";
import type { Feedback } from "@/types/feedback";
import { FriendlyError } from "@/lib/errors";
import {
  activateSession,
  completeSession,
  createSession,
  getSession,
} from "@/services/sessionService";
import { submitFeedback } from "@/services/feedbackService";

export { FriendlyError } from "@/lib/errors";

const env = import.meta.env as Record<string, string | undefined>;

const USE_MOCK = env["VITE_USE_MOCK_API"] === "true";
const MOCK_MEETING_URL = env["VITE_MOCK_MEETING_URL"] ?? "";

const STORE_KEY = "speakup.sessions";

type MockRecord = Session & { _readyAt: number };

function readStore(): Record<string, MockRecord> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.sessionStorage.getItem(STORE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeStore(store: Record<string, MockRecord>) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(STORE_KEY, JSON.stringify(store));
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

/** Mock timeline: PREPARING (0-2.6s) -> SEARCHING (2.6-7s) -> READY */
function projectStatus(record: MockRecord): SessionStatus {
  if (record.status === "ACTIVE" || record.status === "COMPLETED")
    return record.status;
  const elapsed = Date.now() - record._readyAt;
  if (elapsed < 2600) return "PREPARING";
  if (elapsed < 7000) return "SEARCHING";
  return "READY";
}

export const api = {
  async createSession(participantName: string): Promise<Session> {
    if (!USE_MOCK) return createSession(participantName);

    await delay(420);
    const id = `s_${Math.random().toString(36).slice(2, 10)}`;
    const record: MockRecord = {
      id,
      participant_name: participantName,
      meeting_url: MOCK_MEETING_URL,
      status: "PREPARING",
      started_at: null,
      completed_at: null,
      created_at: new Date().toISOString(),
      _readyAt: Date.now(),
    };
    const store = readStore();
    store[id] = record;
    writeStore(store);
    return stripped(record);
  },

  async getSession(sessionId: string): Promise<Session> {
    if (!USE_MOCK) return getSession(sessionId);

    await delay(180);
    const store = readStore();
    const record = store[sessionId];
    if (!record)
      throw new FriendlyError("Something went wrong while preparing your session.");
    record.status = projectStatus(record);
    store[sessionId] = record;
    writeStore(store);
    return stripped(record);
  },

  async startSession(sessionId: string): Promise<Session> {
    if (!USE_MOCK) return activateSession(sessionId);

    await delay(260);
    const store = readStore();
    const record = store[sessionId];
    if (!record)
      throw new FriendlyError("Something went wrong while preparing your session.");
    record.status = "ACTIVE";
    record.started_at = new Date().toISOString();
    writeStore(store);
    return stripped(record);
  },

  async completeSession(sessionId: string): Promise<Session> {
    if (!USE_MOCK) return completeSession(sessionId);

    await delay(200);
    const store = readStore();
    const record = store[sessionId];
    if (!record)
      throw new FriendlyError("Something went wrong while preparing your session.");
    record.status = "COMPLETED";
    record.completed_at = new Date().toISOString();
    writeStore(store);
    return stripped(record);
  },

  async sendFeedback(feedback: Feedback): Promise<void> {
    if (!USE_MOCK) return submitFeedback(feedback);
    await delay(600);
  },
};

function stripped(record: MockRecord): Session {
  const { _readyAt: _ignored, ...session } = record;
  return session;
}
