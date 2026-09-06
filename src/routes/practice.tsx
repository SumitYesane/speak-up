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
    const storedId = window.sessionStorage.getItem(SESSION_KEY);
    if (!storedId) return;
    void api
      .getSession(storedId)
      .then((stored) => {
        setSession(stored);
        setName(stored.participant_name);
        if (stored.status === "READY") {
          const reflectionPending =
            window.sessionStorage.getItem(REFLECTION_PENDING_KEY) === stored.id;
          setStage(reflectionPending ? "reflection" : "ready");
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
      .catch(() => window.sessionStorage.removeItem(SESSION_KEY));
  }, [navigate]);

  const begin = useCallback(() => {
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
    setJoining(true);
    try {
      const activated = await api.startSession(session.id);
      setSession(activated);
      if (activated.meeting_url) {
        window.open(activated.meeting_url, "_blank", "noopener,noreferrer");
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
                <NameEntry name={name} setName={setName} onSubmit={begin} />
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
}: {
  name: string;
  setName: (value: string) => void;
  onSubmit: () => void;
}) {
  const valid = name.trim().length > 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (valid) onSubmit();
      }}
    >
      <h1 className="text-[2.25rem] leading-tight tracking-[-0.03em] text-foreground">
        Let's get you ready.
      </h1>
      <p className="mt-3 text-[1.0625rem] text-muted-foreground">What should we call you?</p>

      <div className="mt-10">
        <label htmlFor="name" className="sr-only">
          Your name
        </label>
        <input
          id="name"
          autoFocus
          autoComplete="given-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="h-14 w-full rounded-[10px] border border-border bg-surface px-4 text-[1.0625rem] text-foreground placeholder:text-muted-foreground/70 transition-all duration-200 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
        />
        <p className="mt-3 text-sm text-muted-foreground">That's all we need to get started.</p>
      </div>

      <Button type="submit" size="lg" className="group mt-8 w-full" disabled={!valid}>
        Continue
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden
        />
      </Button>
    </form>
  );
}

function Connecting({ status }: { status: Session["status"] }) {
  const searching = status === "SEARCHING";

  return (
    <div className="text-center" aria-live="polite">
      <ConnectionAnimation
        className="mx-auto"
        phase={searching ? "searching" : "idle"}
        labels={["You", searching ? "Searching" : ""]}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={searching ? "searching" : "preparing"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <h1 className="text-[1.75rem] leading-tight tracking-[-0.025em] text-foreground">
            {searching ? "Finding your conversation..." : "Getting things ready."}
          </h1>
          <p className="mt-3 text-[0.9375rem] text-muted-foreground">
            {searching
              ? "Looking for someone who's ready to talk."
              : "You won't need to prepare anything."}
          </p>
        </motion.div>
      </AnimatePresence>
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
    <div className="text-center">
      <ConnectionAnimation className="mx-auto" phase="connected" labels={["You", "Them"]} />

      <motion.div {...step(0.25)} className="mt-10 flex justify-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-success">
          <Check className="size-3.5" aria-hidden />
          Connected
        </span>
      </motion.div>

      <motion.h1
        {...step(0.45)}
        className="mt-6 text-[1.875rem] leading-tight tracking-[-0.028em] text-foreground"
      >
        Your conversation is ready.
      </motion.h1>

      <motion.p {...step(0.65)} className="mt-3 text-[0.9375rem] text-muted-foreground">
        You don't need to prepare anything. Just join and start talking.
      </motion.p>

      <motion.div {...step(0.85)} className="mt-9">
        <Button size="lg" className="w-full" onClick={onJoin} loading={joining}>
          Join Session
        </Button>
        <p className="mt-4 text-sm text-muted-foreground">10 minutes · One conversation</p>
      </motion.div>
    </div>
  );
}
