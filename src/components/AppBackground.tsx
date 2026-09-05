import { Aurora } from "@/components/Aurora";

/**
 * Ambient background shared by every in-app screen so the visual language
 * from the landing page carries through the whole flow.
 */
export function AppBackground({
  intensity = "soft",
}: {
  intensity?: "soft" | "medium" | "strong";
}) {
  return (
    <>
      <Aurora intensity={intensity} className="fixed" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.5]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
        }}
      />
    </>
  );
}
