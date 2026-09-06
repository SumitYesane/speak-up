import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Globe2, ShieldCheck, Timer } from "lucide-react";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Aurora, GridField } from "@/components/Aurora";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SpeakUp — Speak English confidently in 10 minutes a day" },
      {
        name: "description",
        content:
          "Practice speaking in a comfortable, judgment-free 10-minute conversation with a real person. No preparation. No tests. Just talk.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        property: "og:title",
        content: "SpeakUp — Speak English confidently in 10 minutes a day",
      },
      {
        property: "og:description",
        content:
          "Ten minutes. One real conversation. Practice speaking without judgment.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="grain min-h-screen overflow-x-clip bg-background">
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <HowItWorks />
        <Demo />
        <Proof />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}

/* ---------------------------------------------------------------- header */

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={
          "mx-auto flex h-14 max-w-7xl items-center justify-between rounded-full px-4 transition-all duration-500 ease-out sm:px-5 " +
          (scrolled ? "glass shadow-lift" : "border border-transparent")
        }
      >
        <Link to="/" aria-label="SpeakUp home">
          <Logo />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {[
            ["How it works", "#how-it-works"],
            ["Why it works", "#why"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="hidden h-10 items-center rounded-full px-3.5 text-sm text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
            >
              {label}
            </a>
          ))}
          <Button asChild size="sm">
            <Link to="/practice">Practice Now</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ hero */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Aurora intensity="strong" />
      <GridField />

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
            <div>
              <Reveal>
                <span className="glass inline-flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-[0.8125rem] text-muted-foreground">
                  <span className="bg-brand inline-flex size-6 items-center justify-center rounded-full text-primary-foreground">
                    <Sparkles className="size-3.5" aria-hidden />
                  </span>
                  A simple place to practice speaking.
                </span>
              </Reveal>

              <Reveal delay={0.08}>
                <h1 className="text-hero mt-6 text-foreground sm:mt-7">
                  <span className="block lg:whitespace-nowrap">Stop studying.</span>
                  <span className="text-gradient block lg:whitespace-nowrap">Start speaking.</span>
                </h1>
              </Reveal>

              <Reveal delay={0.16}>
                <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-muted-foreground sm:mt-6">
                  You don't need another lesson. You need a chance to talk. Spend 10 minutes having a real conversation, without worrying about getting every word right.
                </p>
              </Reveal>

              <Reveal delay={0.24}>
                <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
                  <Button asChild size="lg" className="group">
                    <Link to="/practice">
                      Practice Now
                      <ArrowRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <a href="#how-it-works">See how it works</a>
                  </Button>
                </div>
              </Reveal>

<Reveal delay={0.32}>
  <div className="mt-7 w-full max-w-2xl">
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background/60 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      
      {/* subtle background glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/15" />

      <div className="relative flex flex-col divide-y divide-border/40 sm:flex-row sm:divide-x sm:divide-y-0">
        
        {/* 10 minutes */}
        <div className="flex flex-1 items-center gap-3 px-4 py-4 sm:px-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-tight text-foreground">
              10 minutes
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              One real conversation
            </p>
          </div>
        </div>

        {/* No preparation */}
        <div className="flex flex-1 items-center gap-3 px-4 py-4 sm:px-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/[0.04] text-foreground/70">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path d="M12 3v18" />
              <path d="M3 12h18" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>

          <div>
            <p className="text-sm font-semibold tracking-tight text-foreground">
              No preparation
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Just show up
            </p>
          </div>
        </div>

        {/* Free beta */}
        <div className="flex flex-1 items-center gap-3 px-4 py-4 sm:px-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-5 w-5"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold tracking-tight text-foreground">
                Free beta
              </p>

              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                Now
              </span>
            </div>

            <p className="mt-0.5 text-xs text-muted-foreground">
              Try it. Tell us what you think.
            </p>
          </div>
        </div>

      </div>
    </div>

    {/* tiny supporting line */}
    <p className="mt-3 text-center text-[11px] text-muted-foreground/70">
      No tests · No awkward introductions · Just talk
    </p>
  </div>
</Reveal>

              {/* <Reveal delay={0.32}>
                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                  <AvatarStack />
                  <span className="flex items-center gap-2">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-70" />
                      <span className="relative inline-flex size-2 rounded-full bg-success" />
                    </span>
                    <span className="tabular"></span>people talking right now
                  </span>
                </div>
              </Reveal> */}

              {/* <Reveal delay={0.4}>
                <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
                  {[
                    [Timer, "10 min", "per session"],
                    [Globe2, "40+", "countries"],
                    [ShieldCheck, "0", "signup steps"],
                  ].map(([Icon, n, label]) => {
                    const I = Icon as typeof Timer;
                    return (
                      <div
                        key={label as string}
                        className="glass rounded-2xl px-4 py-3.5 transition-transform duration-300 hover:-translate-y-1"
                      >
                        <I className="size-4 text-primary" aria-hidden />
                        <dt className="tabular mt-2.5 text-lg font-medium tracking-tight text-foreground">
                          {n as string}
                        </dt>
                        <dd className="mt-0.5 text-xs text-muted-foreground">
                          {label as string}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </Reveal> */}
            </div>

            <Reveal delay={0.2} y={16}>
              <HeroVisual />
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  );
}

function AvatarStack() {
  const tones = ["bg-primary", "bg-violet", "bg-cyan", "bg-amber"];
  return (
    <span className="flex items-center gap-3">
      <span className="flex -space-x-2.5">
        {tones.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.07, type: "spring", stiffness: 300 }}
            className={`size-7 rounded-full ring-2 ring-background ${t}`}
          />
        ))}
      </span>
      <span>Loved by quiet learners</span>
    </span>
  );
}

function HeroVisual() {
  const reduced = useReducedMotion();

  return (
    <div className="group relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-6 rounded-full bg-brand opacity-[0.12] blur-3xl" />

      <svg viewBox="0 0 360 360" className="relative size-full" aria-hidden>
        <defs>
          <linearGradient id="convo" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.1" />
            <stop offset="50%" stopColor="var(--color-violet)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="node" cx="50%" cy="35%">
            <stop offset="0%" stopColor="var(--color-violet)" />
            <stop offset="100%" stopColor="var(--color-primary)" />
          </radialGradient>
        </defs>

        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={`ring${i}`}
            cx="180"
            cy="180"
            r={58 + i * 26}
            fill="none"
            stroke="var(--color-primary)"
            strokeOpacity={0.1}
            strokeWidth="1"
            animate={reduced ? {} : { r: [58 + i * 26, 64 + i * 26, 58 + i * 26] }}
            transition={{
              duration: 7 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}

        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M 66 180 C 130 ${128 - i * 24}, 230 ${232 + i * 24}, 294 180`}
            stroke="url(#convo)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            animate={reduced ? {} : { opacity: [0.25, 0.9, 0.25] }}
            transition={{
              duration: 6 + i * 1.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}

        {!reduced &&
          [0, 1].map((i) => (
            <circle key={`p${i}`} r="3.5" fill="var(--color-cyan)">
              <animateMotion
                dur="5s"
                repeatCount="indefinite"
                begin={`${i * 2.5}s`}
                path={
                  i === 0
                    ? "M 66 180 C 130 128, 230 232, 294 180"
                    : "M 294 180 C 230 232, 130 128, 66 180"
                }
              />
            </circle>
          ))}

        <motion.circle
          cx="66"
          cy="180"
          r="40"
          fill="var(--color-primary)"
          opacity="0.08"
          animate={reduced ? {} : { r: [40, 48, 40] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="294"
          cy="180"
          r="40"
          fill="var(--color-violet)"
          opacity="0.08"
          animate={reduced ? {} : { r: [40, 48, 40] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <circle cx="66" cy="180" r="11" fill="url(#node)" />
        <circle cx="294" cy="180" r="11" fill="url(#node)" opacity="0.7" />
      </svg>

      <div className="glass absolute top-6 left-0 rounded-full px-3.5 py-1.5 text-xs text-foreground shadow-lift animate-float-slow">
        You
      </div>
      <div
        className="glass absolute right-0 bottom-10 rounded-full px-3.5 py-1.5 text-xs text-foreground shadow-lift animate-float-slow"
        style={{ animationDelay: "-4s" }}
      >
        A real conversation
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- marquee */

const MARQUEE = [
  "NO GRAMMAR DRILLS",
  "NO VOCABULARY LISTS",
  "NO TESTS",
  "NO SCORES",
  "NO HOMEWORK",
  "JUST REAL CONVERSATION",
];


function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-border/70 bg-surface/60 py-4">
      <div
        className="flex w-max animate-marquee gap-10 whitespace-nowrap will-change-transform"
        aria-hidden
      >
        {[...MARQUEE, ...MARQUEE].map((item, i) => (
          <span
            key={i}
            className="text-eyebrow flex items-center gap-10 text-muted-foreground"
          >
            {item}
            <span className="size-1 rounded-full bg-primary/50" />
          </span>
        ))}
      </div>
      <span className="sr-only">
        Just real conversation, no grammar drills, no vocabulary lists, no scores, no judgment.
      </span>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

/* --------------------------------------------------------------- problem */

const THOUGHTS = [
  ["I know what I want to say…", "I just can't find the words."],
  ["I understand everything.", "But when it's my turn, I freeze."],
  ["I wish I had someone", "I could practice with."],
];

function Problem() {
  return (
    <section id="why" className="relative scroll-mt-24">
      <Aurora intensity="soft" className="opacity-30" />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <Reveal>
          <p className="text-eyebrow text-primary">The real blocker</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display mt-4 max-w-2xl text-foreground">
            Knowing English isn't the same as{" "}
            <span className="text-gradient">speaking comfortably.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {THOUGHTS.map(([a, b], i) => (
            <Reveal key={a} delay={i * 0.1}>
              <motion.blockquote
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="glass h-full rounded-3xl p-7 shadow-soft transition-shadow duration-300 hover:shadow-float"
              >
                <span className="bg-brand block h-px w-10 rounded-full" />
                <p className="mt-6 text-[1.375rem] leading-snug tracking-[-0.02em] text-foreground">
                  {a}
                </p>
                <p className="mt-2 text-[1.375rem] leading-snug tracking-[-0.02em] text-muted-foreground">
                  {b}
                </p>
              </motion.blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- how it works */

const STEPS = [
  {
    n: "01",
    title: "Tell us your name",
    detail: "Just a quick hello before you start.",
  },
  {
    n: "02",
    title: "What do you want to work on?",
    detail:
      "More confidence, less overthinking, or simply getting comfortable speaking.",
  },
  {
    n: "03",
    title: "Start talking",
    detail:
      "Have a real conversation. No script, no pressure, no need to get every word right.",
  },
  {
    n: "04",
    title: "Take a moment to reflect",
    detail:
      "Think about how it felt. What was easy, what wasn't, and how you'd like to improve.",
  },
];

function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 border-t border-border bg-surface/50"
    >
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <Reveal>
          <p className="text-eyebrow text-primary">How it works</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="text-display mt-4 whitespace-nowrap text-foreground">
            It's simpler than you think.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                className={
                  "glass group relative h-full overflow-hidden rounded-3xl p-6 transition-shadow duration-300 " +
                  (active === i ? "shadow-float" : "shadow-soft")
                }
              >
                <div
                  className={
                    "bg-brand absolute inset-x-0 top-0 h-[3px] origin-left transition-transform duration-500 ease-out " +
                    (active === i ? "scale-x-100" : "scale-x-0")
                  }
                />
                <span
                  className={
                    "tabular text-sm font-medium transition-colors duration-300 " +
                    (active === i ? "text-primary" : "text-muted-foreground")
                  }
                >
                  {step.n}
                </span>
                <h3 className="mt-5 text-[1.0625rem] leading-snug tracking-[-0.015em] text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {step.detail}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ demo */

const DEMO_STATES = [
  { key: "searching", caption: "Getting things ready…" },
  { key: "found", caption: "You're ready to talk." },
  { key: "session", caption: "Let's talk." },
] as const;

function Demo() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(reduced ? 2 : 0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % DEMO_STATES.length),
      2800,
    );
    return () => window.clearInterval(id);
  }, [reduced]);

  const state = DEMO_STATES[index]!.key;

  return (
    <section className="relative border-t border-border">
      <Aurora intensity="soft" />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <Reveal>
          <h2 className="text-display whitespace-nowrap text-foreground">
            It feels less like practice.
            <span className="text-gradient block">It should feel like a conversation.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 200, damping: 24 }}
            className="glass mt-14 overflow-hidden rounded-[28px] shadow-float"
          >
            <div className="flex items-center justify-between border-b border-border/70 px-5 py-4">
              <div className="flex items-center gap-3">
                <Logo />
                <span className="hidden text-sm text-muted-foreground sm:inline">
                  10-minute practice
                </span>
              </div>
              <span className="tabular rounded-full bg-accent px-3 py-1 text-sm text-accent-foreground">
                09:42
              </span>
            </div>

            <div className="grid min-h-[340px] lg:grid-cols-[1.6fr_1fr]">
              <div className="relative grid place-items-center border-b border-border/70 p-8 lg:border-r lg:border-b-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={state}
                    initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                    transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    className="w-full max-w-xs text-center"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span className="size-3 rounded-full bg-primary" />
                      <motion.span
                        className="bg-brand h-[2px] rounded-full"
                        initial={false}
                        animate={{
                          width:
                            state === "searching" ? 20 : state === "found" ? 64 : 110,
                          opacity: state === "searching" ? 0.35 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      />
                      <span
                        className={
                          "size-3 rounded-full bg-violet transition-opacity duration-500 " +
                          (state === "searching" ? "opacity-25" : "opacity-100")
                        }
                      />
                    </div>
                    <p className="mt-7 text-sm text-muted-foreground">
                      {DEMO_STATES[index]!.caption}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="p-6">
                <p className="text-eyebrow text-primary">Not sure what to say?</p>
                <p className="mt-5 text-[1.125rem] leading-snug tracking-[-0.015em] text-foreground">
                  Tell me about something you're currently working on.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Tell me more about that.
                </p>
                <span className="glass mt-6 inline-flex h-9 items-center rounded-full px-4 text-sm text-muted-foreground">
                  Another idea
                </span>
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- proof */

const QUOTES = [
  {
    quote:
      "You don't need to feel confident before you start. Sometimes you just need ten minutes to prove to yourself that you can.",
    who: "The idea behind SpeakUp",
    where: "Built from real experience",
  },
  {
    quote:
      "The goal isn't to speak perfect English. It's to stop thinking about every word and just have the conversation.",
    who: "What we're trying to change",
    where: "One conversation at a time",
  },
  {
    quote:
      "Ten minutes won't change everything. But it might make the next conversation feel a little easier.",
    who: "The SpeakUp approach",
    where: "Keep showing up",
  },
];

function Proof() {
  return (
    <section className="relative border-t border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <Reveal>
          <h2 className="text-display max-w-xl text-foreground">
            Ten minutes can be enough to start.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {QUOTES.map((q, i) => (
            <Reveal key={q.who} delay={i * 0.09}>
              <motion.figure
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="glass h-full rounded-3xl p-7 shadow-soft hover:shadow-float"
              >
                <p className="text-[1.0625rem] leading-relaxed text-foreground">
                  “{q.quote}”
                </p>
                <figcaption className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="bg-brand size-8 rounded-full opacity-80" />
                  <span>
                    <span className="block text-foreground">{q.who}</span>
                    {q.where}
                  </span>
                </figcaption>
              </motion.figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- final cta */

function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-border">
      <Aurora intensity="strong" />
      <div className="mx-auto max-w-3xl px-6 py-28 text-center sm:py-36">
        <Reveal>
          <h2 className="text-display text-foreground">
            Ready to just <span className="text-gradient">start talking?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-md text-[1.0625rem] leading-relaxed text-muted-foreground">
            No preparation. No test. Just 10 minutes to have a real conversation.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10">
            <Button asChild size="lg" className="group">
              <Link to="/practice">
                Start a 10-minute conversation
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </Button>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Free to try · No account required
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-9">
        <Logo />
        <p className="text-sm text-muted-foreground">
          10 minutes. One real conversation.
        </p>
      </div>
    </footer>
  );
}
