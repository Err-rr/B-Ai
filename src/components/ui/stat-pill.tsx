import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface StatPillProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  className?: string;
}

/**
 * A quiet, honest stat chip for the top bar — "few and honest" per the
 * brief, not a badge (which carries color meaning) and not a button
 * (nothing to click).
 */
export function StatPill({
  icon: Icon,
  value,
  label,
  className,
}: StatPillProps) {
  return (
    <div
      className={cn(
        "border-line bg-card inline-flex items-center gap-2 rounded-full border py-1.5 pr-4 pl-3",
        className,
      )}
    >
      <Icon className="text-ink-3 size-4" aria-hidden="true" />
      <span className="text-ink font-sans text-sm font-semibold">{value}</span>
      <span className="text-ink-3 text-xs">{label}</span>
    </div>
  );
}
