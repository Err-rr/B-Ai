import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface SelectableCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
  className?: string;
  compact?: boolean;
}

/**
 * Brilliant's dramatic selection contrast: the chosen option scales up
 * with a soft tint and shadow; everything else goes flat and
 * desaturated. Used by onboarding's role and plan pickers.
 */
export function SelectableCard({
  icon: Icon,
  title,
  description,
  selected,
  onSelect,
  className,
  compact = false,
}: SelectableCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-[transform,box-shadow,border-color,filter] duration-200 ease-out sm:gap-3 sm:p-6",
        compact && "gap-1 rounded-xl p-3 sm:gap-1 sm:p-3",
        selected
          ? "bg-tint-mint border-green shadow-soft scale-105"
          : "border-line bg-card scale-95 opacity-70 grayscale hover:opacity-90",
        className,
      )}
    >
      <span
        className={cn(
          "inline-flex size-11 items-center justify-center rounded-xl",
          compact && "size-8 rounded-lg",
          selected ? "bg-green text-on-accent" : "bg-paper text-ink-3",
        )}
      >
        <Icon className={compact ? "size-4" : "size-5"} aria-hidden="true" />
      </span>
      <span className={cn("text-ink font-sans text-xl font-semibold", compact && "text-base")}>
        {title}
      </span>
      <span className={cn("text-ink-2 text-sm", compact && "text-xs leading-4")}>
        {description}
      </span>
    </button>
  );
}
