import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { AppBackground } from "@/components/AppBackground";
import { ConnectionAnimation } from "@/components/ConnectionAnimation";
import { ErrorState } from "@/components/ErrorState";
import { PageTransition } from "@/components/PageTransition";
import { SegmentedChoice } from "@/components/SegmentedChoice";
import { api } from "@/services/api";
import { APP_EVENTS, logger } from "@/services/logger";
import type { PreSessionFeeling, PreSessionGoal, Session } from "@/types/session";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const Route = createFileRoute("/practice")({
  head: () => ({
    meta: [
      { title: "Start a conversation — SpeakUp" },
      {
        name: "description",
        content:
          "Tell us what to call you and we'll find someone who's ready to talk. No account required.",
      },
      { property: "og:title", content: "Start a conversation — SpeakUp" },
      {
        property: "og:description",
        content: "Ten minutes, one conversation, no preparation needed.",
      },
    ],
  }),
  component: Practice,
});

type Stage = "name" | "reflection" | "connecting" | "ready" | "error";
const SESSION_KEY = "speakup.session.id";
const REFLECTION_PENDING_KEY = "speakup.session.reflection.pending";

const GOALS: { value: PreSessionGoal; label: string }[] = [
  { value: "speak_more_comfortably", label: "Speak more comfortably" },
  { value: "stop_overthinking", label: "Stop overthinking" },
  { value: "feel_more_confident", label: "Feel more confident" },
  { value: "just_get_some_practice", label: "Just get some practice" },
];

const FEELINGS: { value: PreSessionFeeling; label: string }[] = [
  { value: "a_little_nervous", label: "A little nervous" },
  { value: "a_bit_unsure", label: "A bit unsure" },
  { value: "somewhere_in_between", label: "Somewhere in between" },
  { value: "pretty_comfortable", label: "Pretty comfortable" },
  { value: "feeling_confident", label: "I'm feeling confident" },
];

function Practice() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("name");
  const [name, setName] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [joining, setJoining] = useState(false);
  const pollRef = useRef<number | null>(null);
  const sessionCreationRef = useRef<Promise<Session> | null>(null);

  const stopPolling = () => {
    if (pollRef.current) window.clearInterval(pollRef.current);
    pollRef.current = null;
  };

  useEffect(() => stopPolling, []);

  useEffect(() => {
    logger.info(APP_EVENTS.PRACTICE_PAGE_OPENED, { source: "ui" });
    const storedId = window.sessionStorage.getItem(SESSION_KEY);
    if (!storedId) return;
    void api
      .getSession(storedId)
      .then((stored) => {
        logger.warn(APP_EVENTS.SESSION_RESTORED, {
          source: "ui",
          sessionId: stored.id,
          metadata: { status: stored.status },
        });
        setSession(stored);
        setName(stored.participant_name);
        if (stored.status === "READY") {
          const reflectionPending =
            window.sessionStorage.getItem(REFLECTION_PENDING_KEY) === stored.id;
          const nextStage = reflectionPending ? "reflection" : "ready";
          setStage(nextStage);
          if (nextStage === "ready") {
            logger.info(APP_EVENTS.SESSION_READY_DISPLAYED, {
              source: "ui",
              sessionId: stored.id,
            });
          }
        }
        if (stored.status === "ACTIVE") {
          navigate({
            to: "/session",
            search: { id: stored.id, name: stored.participant_name },
          });
        }
        if (stored.status === "COMPLETED") {
          navigate({
            to: "/feedback",
            search: { id: stored.id, name: stored.participant_name },
          });
        }
      })
      .catch((error: unknown) => {
        logger.error(APP_EVENTS.SESSION_RESTORE_FAILED, {
          source: "ui",
          sessionId: storedId,
          error,
        });
        window.sessionStorage.removeItem(SESSION_KEY);
      });
  }, [navigate]);

  const begin = useCallback(() => {
    logger.info(APP_EVENTS.NAME_SUBMISSION_STARTED, { source: "ui" });
    window.sessionStorage.setItem(REFLECTION_PENDING_KEY, "pending");
    setStage("reflection");

    const creation = api.createSession(name.trim());
    sessionCreationRef.current = creation;
    void creation
      .then((created) => {
        setSession(created);
        window.sessionStorage.setItem(SESSION_KEY, created.id);
        window.sessionStorage.setItem(REFLECTION_PENDING_KEY, created.id);
      })
      .catch(() => setStage("error"));
  }, [name]);

  const saveReflection = async (goal: PreSessionGoal, feeling: PreSessionFeeling) => {
    let activeSession = session;
    if (!activeSession && sessionCreationRef.current) {
      try {
        activeSession = await sessionCreationRef.current;
        setSession(activeSession);
      } catch {
        setStage("error");
        return;
      }
    }
    if (!activeSession) return;
    setStage("connecting");
    try {
      const updated = await api.savePreSessionReflection(activeSession.id, goal, feeling);
      setSession(updated);
      window.sessionStorage.removeItem(REFLECTION_PENDING_KEY);
      pollRef.current = window.setInterval(async () => {
        try {
          const next = await api.getSession(updated.id);
          setSession(next);
          if (next.status === "READY") {
            stopPolling();
            setStage("ready");
            logger.info(APP_EVENTS.SESSION_READY, { source: "ui", sessionId: next.id });
            logger.info(APP_EVENTS.SESSION_READY_DISPLAYED, { source: "ui", sessionId: next.id });
          }
        } catch {
          stopPolling();
          setStage("error");
        }
      }, 900);
    } catch {
      setStage("error");
    }
  };

  const join = async () => {
    if (!session || joining) return;
    logger.info(APP_EVENTS.SESSION_JOIN_CLICKED, { source: "ui", sessionId: session.id });
    setJoining(true);
    try {
      const activated = await api.startSession(session.id);
      setSession(activated);
      if (activated.meeting_url) {
        logger.info(APP_EVENTS.MEETING_OPEN_ATTEMPTED, {
          source: "ui",
          sessionId: session.id,
        });
        const meetingWindow = window.open(activated.meeting_url, "_blank", "noopener,noreferrer");
        logger.event(meetingWindow ? APP_EVENTS.MEETING_OPENED : APP_EVENTS.MEETING_OPEN_FAILED, {
          source: "ui",
          severity: meetingWindow ? "info" : "error",
          sessionId: session.id,
          metadata: { popup_blocked: !meetingWindow },
        });
      }
      navigate({ to: "/session", search: { id: session.id, name: session.participant_name } });
    } catch {
      setJoining(false);
      setStage("error");
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <AppBackground intensity="soft" />

      <header className="flex h-16 items-center justify-between px-6">
        <Link to="/" aria-label="SpeakUp home">
          <Logo />
        </Link>
        {stage === "name" && (
          <Button asChild variant="ghost" size="sm">
            <Link to="/">
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </Link>
          </Button>
        )}
      </header>

      <main className="flex flex-1 items-center justify-center px-6 pb-24">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {stage === "name" && (
              <PageTransition key="name">
                <NameEntry
                  name={name}
                  setName={setName}
                  onSubmit={begin}
                  onInvalid={() =>
                    logger.warn(APP_EVENTS.NAME_SUBMISSION_VALIDATION_FAILED, { source: "ui" })
                  }
                />
              </PageTransition>
            )}

            {stage === "connecting" && (
              <PageTransition key="connecting">
                <Connecting status={session?.status ?? "PREPARING"} />
              </PageTransition>
            )}

            {stage === "reflection" && (
              <PageTransition key="reflection">
                <PreSessionReflection onSubmit={saveReflection} />
              </PageTransition>
            )}

            {stage === "ready" && (
              <PageTransition key="ready">
                <ReadyState onJoin={join} joining={joining} />
              </PageTransition>
            )}

            {stage === "error" && (
              <PageTransition key="error">
                <ErrorState
                  onRetry={() => {
                    logger.warn(APP_EVENTS.USER_RETRY_STARTED, { source: "ui" });
                    setSession(null);
                    setStage("name");
                  }}
                />
              </PageTransition>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function PreSessionReflection({
  onSubmit,
}: {
  onSubmit: (goal: PreSessionGoal, feeling: PreSessionFeeling) => void;
}) {
  const [goal, setGoal] = useState<PreSessionGoal | null>(null);
  const [feeling, setFeeling] = useState<PreSessionFeeling | null>(null);
  const canContinue = goal !== null && feeling !== null;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (canContinue) onSubmit(goal, feeling);
      }}
      className="card-elevated gradient-top overflow-hidden p-7 sm:p-10"
    >
      <div className="text-center">
        <p className="text-eyebrow text-primary">Before we start</p>
        <h1 className="mt-3 text-[2rem] leading-tight tracking-[-0.03em] text-foreground">
          What would you like to get out of this conversation?
        </h1>
        <p className="mt-3 text-[0.9375rem] text-muted-foreground">
          There's no right answer. Just pick what feels closest.
        </p>
      </div>

      <div className="my-8 h-px hairline" aria-hidden />

      <div className="space-y-9">
        <SegmentedChoice
          label="What feels closest?"
          options={GOALS}
          value={goal}
          onChange={setGoal}
          columns="two"
          showCheck
        />
        <AnimatePresence initial={false}>
          {goal && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <SegmentedChoice
                label="How are you feeling about speaking right now?"
                description="You don't have to feel ready. Just be honest."
                options={FEELINGS}
                value={feeling}
                onChange={setFeeling}
                columns="two"
                showCheck
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-7 flex items-center justify-between text-xs text-muted-foreground">
        <span>{goal ? "One more, then you're ready." : "A quick check-in"}</span>
        <span>{canContinue ? "2 of 2" : goal ? "1 of 2" : "0 of 2"}</span>
      </div>

      <div className="mt-5 border-t border-border pt-7 text-center">
        <p className="text-sm text-muted-foreground">
          Nothing to prepare. We'll just talk for 10 minutes.
        </p>
        <Button type="submit" size="lg" className="mt-5 w-full" disabled={!canContinue}>
          I'm Ready
          <ArrowRight className="size-4" aria-hidden />
        </Button>
      </div>
    </form>
  );
}

function NameEntry({
  name,
  setName,
  onSubmit,
  onInvalid,
}: {
  name: string;
  setName: (value: string) => void;
  onSubmit: () => void;
  onInvalid: () => void;
}) {
  const valid = name.trim().length > 0;

  return (
    <div className="card-elevated gradient-top p-7 sm:p-8">
      <div className="text-center">
        <p className="text-eyebrow text-primary">Ready when you are</p>
        <h1 className="mt-3 text-[2.1rem] leading-tight tracking-[-0.03em] text-foreground">
          Let’s make this easy.
        </h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) onSubmit();
          else onInvalid();
        }}
        className="mt-8"
      >
        <div>
          <label htmlFor="name" className="mb-2 block text-[0.9375rem] text-foreground">
            What should we call you?
          </label>
          <input
            id="name"
            autoFocus
            autoComplete="given-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="h-14 w-full rounded-[14px] border border-border bg-surface px-4 text-[1.0625rem] text-foreground placeholder:text-muted-foreground/70 transition-all duration-200 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
          />
          <p className="mt-3 text-sm text-muted-foreground">
            That’s all we need before we find your conversation.
          </p>
        </div>

        <Button type="submit" size="lg" className="group mt-8 w-full" disabled={!valid}>
          Continue
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden
          />
        </Button>
      </form>
    </div>
  );
}

function Connecting({ status }: { status: Session["status"] }) {
  const searching = status === "SEARCHING";

  return (
    <div className="text-center" aria-live="polite">
      <div className="card-elevated gradient-top p-7 sm:p-8">
        <ConnectionAnimation
          className="mx-auto"
          phase={searching ? "searching" : "idle"}
          labels={["You", searching ? "Looking" : "Waiting"]}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={searching ? "searching" : "preparing"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10"
          >
            <h1 className="text-[1.8rem] leading-tight tracking-[-0.025em] text-foreground">
              {searching ? "Finding your conversation..." : "Getting things ready."}
            </h1>
            <p className="mt-3 text-[0.9375rem] text-muted-foreground">
              {searching
                ? "A calm conversation is being matched for you."
                : "No prep, no pressure. We’ll take it from here."}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ReadyState({ onJoin, joining }: { onJoin: () => void; joining: boolean }) {
  const reduced = useReducedMotion();
  const step = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: reduced ? 0 : delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <div className="card-elevated gradient-top p-7 text-center sm:p-8">
      <ConnectionAnimation className="mx-auto" phase="connected" labels={["You", "Them"]} />

      <motion.div {...step(0.2)} className="mt-9 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-700">
          <Check className="size-3.5" aria-hidden />
          Conversation ready
        </span>
      </motion.div>

      <motion.h1
        {...step(0.35)}
        className="mt-6 text-[1.9rem] leading-tight tracking-[-0.028em] text-foreground"
      >
        Someone is ready to talk.
      </motion.h1>

      <motion.p {...step(0.5)} className="mt-3 text-[0.9375rem] text-muted-foreground">
        Nothing to prepare. Just join, settle in, and start speaking naturally.
      </motion.p>

      <motion.div {...step(0.7)} className="mt-9">
        <Button size="lg" className="w-full" onClick={onJoin} loading={joining}>
          I’m ready
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">10 minutes · One real conversation</p>
      </motion.div>
    </div>
  );
}
