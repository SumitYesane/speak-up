import { supabase, supabaseConfigured } from "@/lib/supabase";

export const APP_EVENTS = {
  PRACTICE_PAGE_OPENED: "PRACTICE_PAGE_OPENED",
  PRACTICE_BUTTON_CLICKED: "PRACTICE_BUTTON_CLICKED",
  NAME_SUBMISSION_STARTED: "NAME_SUBMISSION_STARTED",
  NAME_SUBMISSION_VALIDATION_FAILED: "NAME_SUBMISSION_VALIDATION_FAILED",
  SESSION_RESTORED: "SESSION_RESTORED",
  SESSION_RESTORE_FAILED: "SESSION_RESTORE_FAILED",
  SESSION_CREATION_STARTED: "SESSION_CREATION_STARTED",
  SESSION_CREATED: "SESSION_CREATED",
  SESSION_CREATION_FAILED: "SESSION_CREATION_FAILED",
  SESSION_FETCHED: "SESSION_FETCHED",
  SESSION_FETCH_FAILED: "SESSION_FETCH_FAILED",
  SESSION_READY: "SESSION_READY",
  SESSION_READY_DISPLAYED: "SESSION_READY_DISPLAYED",
  SESSION_JOIN_CLICKED: "SESSION_JOIN_CLICKED",
  SESSION_ACTIVATION_STARTED: "SESSION_ACTIVATION_STARTED",
  SESSION_ACTIVATED: "SESSION_ACTIVATED",
  SESSION_ACTIVATION_FAILED: "SESSION_ACTIVATION_FAILED",
  MEETING_OPEN_ATTEMPTED: "MEETING_OPEN_ATTEMPTED",
  MEETING_OPENED: "MEETING_OPENED",
  MEETING_OPEN_FAILED: "MEETING_OPEN_FAILED",
  TIMER_STARTED: "TIMER_STARTED",
  TIMER_RESUMED: "TIMER_RESUMED",
  TIMER_COMPLETED: "TIMER_COMPLETED",
  SESSION_COMPLETION_STARTED: "SESSION_COMPLETION_STARTED",
  SESSION_COMPLETED: "SESSION_COMPLETED",
  SESSION_COMPLETION_FAILED: "SESSION_COMPLETION_FAILED",
  FEEDBACK_OPENED: "FEEDBACK_OPENED",
  FEEDBACK_SUBMISSION_STARTED: "FEEDBACK_SUBMISSION_STARTED",
  FEEDBACK_SUBMITTED: "FEEDBACK_SUBMITTED",
  FEEDBACK_SUBMISSION_FAILED: "FEEDBACK_SUBMISSION_FAILED",
  USER_RETRY_STARTED: "USER_RETRY_STARTED",
  CLIENT_ERROR: "CLIENT_ERROR",
} as const;

type AppEventType = (typeof APP_EVENTS)[keyof typeof APP_EVENTS];
type EventSource = "ui" | "session_service" | "feedback_service" | "timer" | "system";
type Severity = "debug" | "info" | "warn" | "error";

interface EventOptions {
  source: EventSource;
  severity?: Severity;
  sessionId?: string | null;
  metadata?: Record<string, unknown>;
  error?: unknown;
}

function describeError(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return undefined;
}

function getClientContext(): Record<string, unknown> {
  if (typeof window === "undefined") return {};
  return {
    browser: getBrowser(navigator.userAgent),
    operating_system: getOperatingSystem(navigator.userAgent),
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
}

function getBrowser(userAgent: string) {
  if (/Edg\//.test(userAgent)) return "Edge";
  if (/Chrome\//.test(userAgent)) return "Chrome";
  if (/Firefox\//.test(userAgent)) return "Firefox";
  if (/Safari\//.test(userAgent)) return "Safari";
  return "Other";
}

function getOperatingSystem(userAgent: string) {
  if (/Windows/.test(userAgent)) return "Windows";
  if (/Mac OS X/.test(userAgent)) return "macOS";
  if (/Android/.test(userAgent)) return "Android";
  if (/iPhone|iPad|iPod/.test(userAgent)) return "iOS";
  if (/Linux/.test(userAgent)) return "Linux";
  return "Other";
}

function mirrorToDevelopmentConsole(eventType: AppEventType, options: EventOptions) {
  if (!import.meta.env.DEV) return;
  console.info(`[SpeakUp] ${eventType}`, {
    sessionId: options.sessionId ?? null,
    source: options.source,
    severity: options.severity ?? "info",
    ...(options.metadata ?? {}),
  });
}

function writeEvent(eventType: AppEventType, options: EventOptions) {
  if (!supabaseConfigured) return;
  try {
    const write = supabase.from("app_events").insert({
      session_id: options.sessionId ?? null,
      event_type: eventType,
      event_source: options.source,
      severity: options.severity ?? "info",
      metadata: { ...getClientContext(), ...(options.metadata ?? {}) },
      error_message: describeError(options.error) ?? null,
    });
    void Promise.resolve(write).then(
      ({ error }) => {
        if (error && import.meta.env.DEV) {
          console.warn("[SpeakUp] Event logging failed", error.message);
        }
      },
      (error: unknown) => {
        if (import.meta.env.DEV) {
          console.warn("[SpeakUp] Event logging failed", describeError(error));
        }
      },
    );
  } catch (error: unknown) {
    if (import.meta.env.DEV) console.warn("[SpeakUp] Event logging failed", describeError(error));
  }
}

export const logger = {
  event(eventType: AppEventType, options: EventOptions) {
    try {
      mirrorToDevelopmentConsole(eventType, options);
      writeEvent(eventType, options);
    } catch (error: unknown) {
      if (import.meta.env.DEV) console.warn("[SpeakUp] Event logging failed", describeError(error));
    }
  },
  info(eventType: AppEventType, options: Omit<EventOptions, "severity">) {
    this.event(eventType, { ...options, severity: "info" });
  },
  warn(eventType: AppEventType, options: Omit<EventOptions, "severity">) {
    this.event(eventType, { ...options, severity: "warn" });
  },
  error(eventType: AppEventType, options: Omit<EventOptions, "severity">) {
    this.event(eventType, { ...options, severity: "error" });
  },
};

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => {
    logger.error(APP_EVENTS.CLIENT_ERROR, {
      source: "system",
      error: (event as ErrorEvent).error ?? event,
      metadata: { kind: "error" },
    });
  });
  globalThis.addEventListener("unhandledrejection", (event) => {
    logger.error(APP_EVENTS.CLIENT_ERROR, {
      source: "system",
      error: (event as PromiseRejectionEvent).reason,
      metadata: { kind: "unhandledrejection" },
    });
  });
}
