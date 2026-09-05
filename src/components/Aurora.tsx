import { cn } from "@/lib/utils";

/**
 * Ambient gradient field used behind hero and CTA sections.
 * Purely decorative — sits behind content and never intercepts pointers.
 */
export function Aurora({
  className,
  intensity = "medium",
}: {
  className?: string;
  intensity?: "soft" | "medium" | "strong";
}) {
  const scale =
    intensity === "soft" ? "opacity-40" : intensity === "strong" ? "opacity-90" : "opacity-65";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        scale,
        className,
      )}
    >
      <div className="absolute -top-40 -left-24 size-[38rem] rounded-full bg-primary/25 blur-[110px] animate-aurora" />
      <div
        className="absolute -top-24 right-[-10rem] size-[34rem] rounded-full bg-violet/25 blur-[120px] animate-aurora"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="absolute bottom-[-14rem] left-1/3 size-[30rem] rounded-full bg-cyan/20 blur-[120px] animate-aurora"
        style={{ animationDelay: "-14s" }}
      />
    </div>
  );
}

/** Faint grid that gives the page technical structure without noise. */
export function GridField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
      style={{
        backgroundImage:
          "linear-gradient(to right, color-mix(in oklab, var(--foreground) 5%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 5%, transparent) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
      }}
    />
  );
}
