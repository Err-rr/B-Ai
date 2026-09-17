import { cn } from "@/lib/utils/cn";
import { STAGE_CLASSES, STAGE_ORDER, type Stage } from "@/lib/utils/stage";

export type BadgeTone = Stage | "success" | "warning" | "danger" | "neutral";

export interface BadgeProps {
  tone?: BadgeTone;
  children: React.ReactNode;
  className?: string;
}

const SEMANTIC_CLASSES: Record<
  "success" | "warning" | "danger" | "neutral",
  string
> = {
  success: "bg-success-bg text-success",
  warning: "bg-warning-bg text-warning",
  danger: "bg-danger-bg text-danger",
  neutral: "bg-paper text-ink-2",
};

function isStage(tone: BadgeTone): tone is Stage {
  return (STAGE_ORDER as string[]).includes(tone);
}

function toneClasses(tone: BadgeTone) {
  if (isStage(tone)) {
    const stage = STAGE_CLASSES[tone];
    return cn(stage.tintBg, stage.text);
  }
  return SEMANTIC_CLASSES[tone];
}

/**
 * A small, quiet label - a stage, a status, or a CXO role. Never the
 * loudest thing on a card; stage colors here are a tint wash, not a
 * solid fill (see docs/DESIGN-SYSTEM.md).
 */
export function Badge({ tone = "neutral", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        toneClasses(tone),
        className,
      )}
    >
      {children}
    </span>
  );
}
