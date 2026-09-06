import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function SegmentedChoice<T extends string>({
  label,
  description,
  options,
  value,
  onChange,
  columns = "auto",
  showCheck = false,
}: {
  label: string;
  description?: string;
  options: { value: T; label: string }[];
  value: T | null;
  onChange: (value: T) => void;
  columns?: "auto" | "two" | "three";
  showCheck?: boolean;
}) {
  return (
    <fieldset>
      <legend className="text-[0.9375rem] text-foreground">{label}</legend>
      {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      <div
        role="radiogroup"
        aria-label={label}
        className={cn(
          "mt-4 grid gap-2",
          columns === "two"
            ? "grid-cols-2"
            : columns === "three"
              ? "grid-cols-3 sm:max-w-xs"
              : "grid-cols-1 sm:grid-cols-5",
        )}
      >
        {options.map((option, index) => {
          const selected = value === option.value;
          const loneOption =
            columns === "two" && options.length % 2 === 1 && index === options.length - 1;
          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={cn(
                "relative min-h-12 rounded-[12px] border px-3 py-3 text-[0.8125rem] leading-tight transition-all duration-200 active:scale-[0.97] motion-reduce:active:scale-100",
                loneOption && "col-span-2",
                selected
                  ? "border-transparent bg-brand font-medium text-primary-foreground shadow-cta"
                  : "border-border bg-surface/70 text-muted-foreground backdrop-blur-sm hover:-translate-y-0.5 hover:border-primary/30 hover:text-foreground hover:shadow-lift motion-reduce:hover:translate-y-0",
              )}
            >
              {option.label}
              {showCheck && selected && (
                <Check className="absolute right-2 top-2 size-3.5" aria-hidden />
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
