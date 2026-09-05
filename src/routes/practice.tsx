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
import { api } from "@/services/api";
import type { Session } from "@/types/session";
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

type Stage = "name" | "connecting" | "ready" | "error";
const SESSION_KEY = "speakup.session.id";

function Practice() {
  const navigate = useNavigate();
  const [stage, setStage] = useState<Stage>("name");
  const [name, setName] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [joining, setJoining] = useState(false);
  const pollRef = useRef<number | null>(null);

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
        if (stored.status === "READY") setStage("ready");
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

  const begin = useCallback(async () => {
    setStage("connecting");
    try {
      const created = await api.createSession(name.trim());
      setSession(created);
      window.sessionStorage.setItem(SESSION_KEY, created.id);
      pollRef.current = window.setInterval(async () => {
        try {
          const next = await api.getSession(created.id);
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
  }, [name]);

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
      <p className="mt-3 text-[1.0625rem] text-muted-foreground">
        What should we call you?
      </p>

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
        <p className="mt-3 text-sm text-muted-foreground">
          That's all we need to get started.
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
        <p className="mt-4 text-sm text-muted-foreground">
          10 minutes · One conversation
        </p>
      </motion.div>
    </div>
  );
}
