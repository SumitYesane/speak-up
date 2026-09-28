import { createFileRoute, Link } from "@tanstack/react-router";
// import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Globe2, ShieldCheck, Timer } from "lucide-react";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { Aurora, GridField } from "@/components/Aurora";
// import { useReducedMotion } from "@/hooks/useReducedMotion";
import { APP_EVENTS, logger } from "@/services/logger";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Mic,
  PhoneOff,
  Users,
  MessageCircle,
  BarChart3,
} from "lucide-react";
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
            <Link
              to="/practice"
              onClick={() => logger.info(APP_EVENTS.PRACTICE_BUTTON_CLICKED, { source: "ui" })}
            >
              Practice Now
            </Link>
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
                    <Link
                      to="/practice"
                      onClick={() => logger.info(APP_EVENTS.PRACTICE_BUTTON_CLICKED, { source: "ui" })}
                    >
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

// function HeroVisual() {
//   const reduced = useReducedMotion();

//   return (
//     <div className="group relative mx-auto aspect-square w-full max-w-md">
//       <div className="absolute inset-6 rounded-full bg-brand opacity-[0.12] blur-3xl" />

//       <svg viewBox="0 0 360 360" className="relative size-full" aria-hidden>
//         <defs>
//           <linearGradient id="convo" x1="0" y1="0" x2="1" y2="0">
//             <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.1" />
//             <stop offset="50%" stopColor="var(--color-violet)" stopOpacity="0.95" />
//             <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0.15" />
//           </linearGradient>
//           <radialGradient id="node" cx="50%" cy="35%">
//             <stop offset="0%" stopColor="var(--color-violet)" />
//             <stop offset="100%" stopColor="var(--color-primary)" />
//           </radialGradient>
//         </defs>

//         {[0, 1, 2, 3].map((i) => (
//           <motion.circle
//             key={`ring${i}`}
//             cx="180"
//             cy="180"
//             r={58 + i * 26}
//             fill="none"
//             stroke="var(--color-primary)"
//             strokeOpacity={0.1}
//             strokeWidth="1"
//             animate={reduced ? {} : { r: [58 + i * 26, 64 + i * 26, 58 + i * 26] }}
//             transition={{
//               duration: 7 + i,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: i * 0.5,
//             }}
//           />
//         ))}

//         {[0, 1, 2].map((i) => (
//           <motion.path
//             key={i}
//             d={`M 66 180 C 130 ${128 - i * 24}, 230 ${232 + i * 24}, 294 180`}
//             stroke="url(#convo)"
//             strokeWidth="1.5"
//             fill="none"
//             strokeLinecap="round"
//             animate={reduced ? {} : { opacity: [0.25, 0.9, 0.25] }}
//             transition={{
//               duration: 6 + i * 1.4,
//               repeat: Infinity,
//               ease: "easeInOut",
//               delay: i * 0.8,
//             }}
//           />
//         ))}

//         {!reduced &&
//           [0, 1].map((i) => (
//             <circle key={`p${i}`} r="3.5" fill="var(--color-cyan)">
//               <animateMotion
//                 dur="5s"
//                 repeatCount="indefinite"
//                 begin={`${i * 2.5}s`}
//                 path={
//                   i === 0
//                     ? "M 66 180 C 130 128, 230 232, 294 180"
//                     : "M 294 180 C 230 232, 130 128, 66 180"
//                 }
//               />
//             </circle>
//           ))}

//         <motion.circle
//           cx="66"
//           cy="180"
//           r="40"
//           fill="var(--color-primary)"
//           opacity="0.08"
//           animate={reduced ? {} : { r: [40, 48, 40] }}
//           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.circle
//           cx="294"
//           cy="180"
//           r="40"
//           fill="var(--color-violet)"
//           opacity="0.08"
//           animate={reduced ? {} : { r: [40, 48, 40] }}
//           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
//         />
//         <circle cx="66" cy="180" r="11" fill="url(#node)" />
//         <circle cx="294" cy="180" r="11" fill="url(#node)" opacity="0.7" />
//       </svg>

//       <div className="glass absolute top-6 left-0 rounded-full px-3.5 py-1.5 text-xs text-foreground shadow-lift animate-float-slow">
//         You
//       </div>
//       <div
//         className="glass absolute right-0 bottom-10 rounded-full px-3.5 py-1.5 text-xs text-foreground shadow-lift animate-float-slow"
//         style={{ animationDelay: "-4s" }}
//       >
//         A real conversation
//       </div>
//     </div>
//   );
// }

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
              <Link
                to="/practice"
                onClick={() => logger.info(APP_EVENTS.PRACTICE_BUTTON_CLICKED, { source: "ui" })}
              >
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




function HeroVisual() {
  const reduced = useReducedMotion();

  const [seconds, setSeconds] = useState(8 * 60 + 42);
  const [speaking, setSpeaking] = useState(true);
  const [promptIndex, setPromptIndex] = useState(0);

  const prompts = [
    "How has your day been?",
    "What are you working on?",
    "Tell me something interesting.",
  ];

  const replies = [
    "I've been working on something exciting today.",
    "Actually, I've been learning a lot recently.",
    "It feels good to finally practice this.",
  ];

  // Live timer
  useEffect(() => {
    if (reduced) return;

    const timer = setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [reduced]);

  // Alternate speaking / listening
  useEffect(() => {
    if (reduced) return;

    const interval = setInterval(() => {
      setSpeaking((value) => !value);
    }, 3200);

    return () => clearInterval(interval);
  }, [reduced]);

  // Change conversation text
  useEffect(() => {
    if (reduced) return;

    const interval = setInterval(() => {
      setPromptIndex((value) => (value + 1) % prompts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reduced]);

  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");

  const secs = (seconds % 60).toString().padStart(2, "0");

  /*
   * Small helper for naturally floating UI.
   */
  const floatAnimation = (delay = 0) =>
    reduced
      ? {}
      : {
          y: [0, -7, 0, 5, 0],
          x: [0, 2, -2, 1, 0],
        };

  return (
    <div className="group relative mx-auto aspect-square w-full max-w-xl overflow-hidden">

      {/* =========================================================
          AMBIENT BACKGROUND
      ========================================================== */}

      <motion.div
        className="absolute inset-[12%] rounded-full bg-brand/[0.10] blur-[80px]"
        animate={
          reduced
            ? {}
            : {
                scale: [1, 1.08, 1],
                opacity: [0.5, 0.8, 0.5],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute left-[10%] top-[18%] h-24 w-24 rounded-full bg-violet-400/[0.08] blur-3xl"
        animate={
          reduced
            ? {}
            : {
                x: [0, 25, -10, 0],
                y: [0, -15, 15, 0],
              }
        }
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[15%] right-[8%] h-32 w-32 rounded-full bg-cyan-400/[0.08] blur-3xl"
        animate={
          reduced
            ? {}
            : {
                x: [0, -20, 10, 0],
                y: [0, 15, -10, 0],
              }
        }
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =========================================================
          ORBIT / PARTICLES
      ========================================================== */}

      <svg
        viewBox="0 0 600 600"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="speakupGradient" x1="0" x2="1">
            <stop
              offset="0%"
              stopColor="var(--color-primary)"
              stopOpacity="0.05"
            />
            <stop
              offset="50%"
              stopColor="var(--color-violet)"
              stopOpacity="0.8"
            />
            <stop
              offset="100%"
              stopColor="var(--color-cyan)"
              stopOpacity="0.08"
            />
          </linearGradient>

          <radialGradient id="glow">
            <stop
              offset="0%"
              stopColor="var(--color-violet)"
              stopOpacity="0.7"
            />
            <stop
              offset="100%"
              stopColor="var(--color-violet)"
              stopOpacity="0"
            />
          </radialGradient>
        </defs>

        {/* Soft orbit lines */}

        {[0, 1, 2].map((i) => (
          <motion.ellipse
            key={`orbit-${i}`}
            cx="300"
            cy="300"
            rx={210 + i * 25}
            ry={135 + i * 28}
            fill="none"
            stroke="url(#speakupGradient)"
            strokeWidth="1"
            strokeDasharray={i === 1 ? "2 12" : "1 20"}
            animate={
              reduced
                ? {}
                : {
                    rotate: i % 2 === 0 ? [0, 360] : [360, 0],
                  }
            }
            transition={{
              duration: 35 + i * 12,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              transformOrigin: "300px 300px",
            }}
          />
        ))}

        {/* Moving particles */}

        {!reduced &&
          Array.from({ length: 14 }).map((_, i) => (
            <motion.circle
              key={`particle-${i}`}
              r={i % 4 === 0 ? 4 : 2.5}
              fill={
                i % 3 === 0
                  ? "var(--color-cyan)"
                  : "var(--color-violet)"
              }
              opacity={0.25 + (i % 3) * 0.15}
              animate={{
                cx: [
                  90 + (i * 37) % 420,
                  180 + (i * 61) % 280,
                  420 - (i * 29) % 350,
                  90 + (i * 37) % 420,
                ],
                cy: [
                  110 + (i * 47) % 380,
                  420 - (i * 31) % 300,
                  140 + (i * 53) % 330,
                  110 + (i * 47) % 380,
                ],
                opacity: [0.15, 0.7, 0.2, 0.15],
                scale: [0.7, 1.25, 0.8, 0.7],
              }}
              transition={{
                duration: 8 + (i % 5) * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}
      </svg>

      {/* =========================================================
          LIVE CONVERSATION BADGE
      ========================================================== */}

      <motion.div
        className="absolute left-1/2 top-[5%] z-30 -translate-x-1/2"
        animate={floatAnimation()}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="glass flex items-center gap-2 rounded-full border border-rose-300/20 px-4 py-2 shadow-xl backdrop-blur-xl">
          <motion.span
            className="h-2.5 w-2.5 rounded-full bg-rose-500"
            animate={
              reduced
                ? {}
                : {
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }
            }
            transition={{
              duration: 1.6,
              repeat: Infinity,
            }}
          />

          <span className="text-xs font-medium text-foreground">
            Live conversation
          </span>
        </div>
      </motion.div>

      {/* =========================================================
          LEFT PARTICIPANT — YOU
      ========================================================== */}

      <motion.div
        className="absolute left-[5%] top-[32%] z-20"
        animate={
          reduced
            ? {}
            : {
                y: [0, -5, 0, 4, 0],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="relative flex h-28 w-28 items-center justify-center rounded-full border border-blue-300/40 bg-gradient-to-br from-blue-300/30 via-blue-500/20 to-violet-500/20 shadow-[0_0_45px_rgba(99,102,241,0.20)] backdrop-blur-xl"
          animate={
            speaking && !reduced
              ? {
                  scale: [1, 1.035, 1],
                  boxShadow: [
                    "0 0 35px rgba(99,102,241,0.15)",
                    "0 0 60px rgba(99,102,241,0.32)",
                    "0 0 35px rgba(99,102,241,0.15)",
                  ],
                }
              : {}
          }
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Avatar */}
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-violet-500 shadow-lg">
            <div className="h-7 w-7 rounded-full bg-white/90" />

            <div className="absolute bottom-2 h-5 w-10 rounded-t-full bg-white/80" />
          </div>

          {/* Mic */}
          <div className="absolute -bottom-2 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-primary text-white shadow-lg">
            <Mic className="h-4 w-4" />
          </div>

          {/* Speaking pulse */}
          {speaking && !reduced && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border border-blue-400/40"
                animate={{
                  scale: [1, 1.3, 1.5],
                  opacity: [0.7, 0.25, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              <motion.div
                className="absolute inset-0 rounded-full border border-violet-400/30"
                animate={{
                  scale: [1, 1.5, 1.8],
                  opacity: [0.4, 0.15, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              />
            </>
          )}
        </motion.div>

        <div className="mt-4 text-center">
          <div className="text-sm font-semibold text-foreground">
            You
          </div>

          <motion.div
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1.5 text-xs text-blue-600 dark:text-blue-300"
            animate={
              reduced
                ? {}
                : {
                    opacity: speaking ? [0.7, 1, 0.7] : 0.65,
                  }
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <motion.span
              animate={
                speaking && !reduced
                  ? { scaleY: [0.5, 1.4, 0.7, 1.2, 0.5] }
                  : {}
              }
              transition={{
                duration: 0.7,
                repeat: Infinity,
              }}
            >
              <BarChart3 className="h-3.5 w-3.5" />
            </motion.span>

            {speaking ? "Speaking..." : "Listening..."}
          </motion.div>
        </div>
      </motion.div>

      {/* =========================================================
          RIGHT PARTICIPANT — PARTNER
      ========================================================== */}

      <motion.div
        className="absolute right-[5%] top-[32%] z-20"
        animate={
          reduced
            ? {}
            : {
                y: [0, 5, 0, -4, 0],
              }
        }
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <motion.div
          className="relative flex h-28 w-28 items-center justify-center rounded-full border border-violet-300/40 bg-gradient-to-br from-violet-300/30 via-fuchsia-500/20 to-cyan-500/10 shadow-[0_0_45px_rgba(168,85,247,0.20)] backdrop-blur-xl"
          animate={
            !speaking && !reduced
              ? {
                  scale: [1, 1.035, 1],
                  boxShadow: [
                    "0 0 35px rgba(168,85,247,0.15)",
                    "0 0 60px rgba(168,85,247,0.32)",
                    "0 0 35px rgba(168,85,247,0.15)",
                  ],
                }
              : {}
          }
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 shadow-lg">
            <div className="h-7 w-7 rounded-full bg-white/90" />

            <div className="absolute bottom-2 h-5 w-10 rounded-t-full bg-white/80" />
          </div>

          <div className="absolute -bottom-2 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-violet-500 text-white shadow-lg">
            <Mic className="h-4 w-4" />
          </div>

          {!speaking && !reduced && (
            <motion.div
              className="absolute inset-0 rounded-full border border-violet-400/40"
              animate={{
                scale: [1, 1.3, 1.5],
                opacity: [0.7, 0.25, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          )}
        </motion.div>

        <div className="mt-4 text-center">
          <div className="text-sm font-semibold text-foreground">
            Conversation Partner
          </div>

          <motion.div
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-violet-500/10 px-3 py-1.5 text-xs text-violet-600 dark:text-violet-300"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            {speaking ? "Listening..." : "Speaking..."}
          </motion.div>
        </div>
      </motion.div>

      {/* =========================================================
          CENTRAL LIVE WAVEFORM
      ========================================================== */}

      <div className="absolute left-1/2 top-[48%] z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-[4px]">
        {Array.from({ length: 19 }).map((_, i) => {
          const distance = Math.abs(9 - i);

          return (
            <motion.div
              key={i}
              className="w-[3px] rounded-full bg-gradient-to-b from-blue-400 via-violet-500 to-fuchsia-400"
              animate={
                reduced
                  ? { height: 10 + (9 - distance) * 2 }
                  : {
                      height: speaking
                        ? [
                            10 + (9 - distance) * 2,
                            18 + Math.random() * 34,
                            8 + Math.random() * 20,
                            24 + Math.random() * 30,
                            10 + (9 - distance) * 2,
                          ]
                        : [
                            7 + (9 - distance),
                            12 + (9 - distance) * 1.5,
                            7 + (9 - distance),
                          ],
                    }
              }
              transition={{
                duration: 0.9 + (i % 5) * 0.12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.045,
              }}
            />
          );
        })}
      </div>

      {/* =========================================================
          CONVERSATION BUBBLE — LEFT
      ========================================================== */}

      <AnimatePresence mode="wait">
        <motion.div
          key={`prompt-${promptIndex}`}
          className="absolute left-[0%] top-[15%] z-30"
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.45 }}
        >
          <div className="glass max-w-[190px] rounded-2xl rounded-bl-md px-4 py-3 shadow-xl backdrop-blur-xl">
            <div className="mb-2 flex items-center gap-1.5">
              <MessageCircle className="h-3.5 w-3.5 text-primary" />

              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Conversation
              </span>
            </div>

            <p className="text-xs font-medium leading-relaxed text-foreground">
              {prompts[promptIndex]}
            </p>

            <div className="mt-2 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-primary/60"
                  animate={
                    reduced
                      ? {}
                      : {
                          y: [0, -3, 0],
                        }
                  }
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* =========================================================
          CONVERSATION BUBBLE — RIGHT
      ========================================================== */}

      <AnimatePresence mode="wait">
        <motion.div
          key={`reply-${promptIndex}`}
          className="absolute right-[0%] top-[18%] z-30"
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          <div className="glass max-w-[200px] rounded-2xl rounded-br-md px-4 py-3 shadow-xl backdrop-blur-xl">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-violet-500" />

              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Response
              </span>
            </div>

            <p className="mt-2 text-xs font-medium leading-relaxed text-foreground">
              {replies[promptIndex]}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* =========================================================
          FLOATING PRODUCT BENEFITS
      ========================================================== */}

      <motion.div
        className="absolute left-[-2%] bottom-[25%] z-30 max-sm:hidden"
        animate={floatAnimation()}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 shadow-lg backdrop-blur-xl">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
            <MessageCircle className="h-3.5 w-3.5 text-primary" />
          </div>

          <div>
            <div className="text-[10px] text-muted-foreground">
              Practice
            </div>
            <div className="text-xs font-semibold">
              Real conversation
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[-2%] bottom-[25%] z-30 max-sm:hidden"
        animate={floatAnimation(-2)}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="glass flex items-center gap-2 rounded-xl px-3 py-2 shadow-lg backdrop-blur-xl">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10">
            <Users className="h-3.5 w-3.5 text-violet-500" />
          </div>

          <div>
            <div className="text-[10px] text-muted-foreground">
              Experience
            </div>
            <div className="text-xs font-semibold">
              Judgment-free
            </div>
          </div>
        </div>
      </motion.div>

      {/* =========================================================
          LIVE CALL CONTROL
      ========================================================== */}

      <motion.div
        className="absolute bottom-[4%] left-1/2 z-40 -translate-x-1/2"
        animate={
          reduced
            ? {}
            : {
                y: [0, -3, 0],
              }
        }
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="flex items-center gap-4 rounded-full border border-white/30 bg-white/75 px-5 py-3 shadow-2xl backdrop-blur-2xl dark:bg-slate-900/70">

          {/* Mini waveform */}
          <div className="flex h-7 items-center gap-[2px]">
            {[4, 8, 14, 9, 18, 10, 5].map((height, i) => (
              <motion.span
                key={i}
                className="w-[2px] rounded-full bg-violet-500"
                animate={
                  reduced
                    ? { height }
                    : {
                        height: [height, height + 6, height - 2, height],
                      }
                }
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.08,
                }}
              />
            ))}
          </div>

          {/* Timer */}
          <motion.span
            className="min-w-[54px] text-sm font-semibold tabular-nums text-foreground"
            animate={
              reduced
                ? {}
                : {
                    opacity: [0.8, 1, 0.8],
                  }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            {minutes}:{secs}
          </motion.span>

          {/* Call button */}
          <motion.button
            type="button"
            aria-label="End conversation"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 text-white shadow-lg shadow-rose-500/25"
            whileHover={reduced ? {} : { scale: 1.08 }}
            whileTap={reduced ? {} : { scale: 0.94 }}
          >
            <PhoneOff className="h-4 w-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* =========================================================
          SMALL FLOATING STATUS
      ========================================================== */}

      <motion.div
        className="absolute bottom-[8%] left-[12%] z-30 hidden sm:block"
        animate={
          reduced
            ? {}
            : {
                rotate: [-2, 2, -2],
              }
        }
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5 shadow-lg">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-emerald-500"
            animate={
              reduced
                ? {}
                : {
                    scale: [1, 1.5, 1],
                  }
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />

          <span className="text-[10px] font-medium text-muted-foreground">
            Comfortable space
          </span>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[12%] bottom-[8%] z-30 hidden sm:block"
        animate={
          reduced
            ? {}
            : {
                rotate: [2, -2, 2],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="glass flex items-center gap-2 rounded-full px-3 py-1.5 shadow-lg">
          <Sparkles className="h-3 w-3 text-amber-500" />

          <span className="text-[10px] font-medium text-muted-foreground">
            Build confidence
          </span>
        </div>
      </motion.div>
    </div>
  );
}
