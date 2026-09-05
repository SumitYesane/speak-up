import { cn } from "@/lib/utils";

export function SegmentedChoice<T extends string>({
  label,
  options,
  value,
  onChange,
  columns = "auto",
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (value: T) => void;
  columns?: "auto" | "three";
}) {
  return (
    <fieldset>
      <legend className="text-[0.9375rem] text-foreground">{label}</legend>
      <div
        role="radiogroup"
        aria-label={label}
        className={cn(
          "mt-4 grid gap-2",
          columns === "three"
            ? "grid-cols-3 sm:max-w-xs"
            : "grid-cols-1 sm:grid-cols-5",
        )}
      >
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                "min-h-11 rounded-[12px] border px-3 py-2.5 text-[0.8125rem] leading-tight transition-all duration-200 active:scale-[0.97] motion-reduce:active:scale-100",
                selected
                  ? "border-transparent bg-brand text-primary-foreground shadow-cta"
                  : "border-border bg-surface/70 text-muted-foreground backdrop-blur-sm hover:-translate-y-0.5 hover:border-primary/30 hover:text-foreground hover:shadow-lift motion-reduce:hover:translate-y-0",
              )}

            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
