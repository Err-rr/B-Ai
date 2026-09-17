import { cn } from "@/lib/utils/cn";
import { STAGE_CLASSES, type Stage } from "@/lib/utils/stage";

export interface ProgressSegment {
  tone: Stage;
  filled: boolean;
}

export interface SegmentedProgressProps {
  segments: ProgressSegment[];
  label: string;
  className?: string;
}

/**
 * Discrete chunks, not a continuous bar (Brilliant's pattern). Each
 * segment's fill color is meaningful — see docs/DESIGN-SYSTEM.md.
 */
export function SegmentedProgress({
  segments,
  label,
  className,
}: SegmentedProgressProps) {
  const filledCount = segments.filter((s) => s.filled).length;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={filledCount}
      aria-valuemin={0}
      aria-valuemax={segments.length}
      className={cn("flex gap-1.5", className)}
    >
      {segments.map((segment, index) => (
        <span
          key={index}
          className={cn(
            "h-1.5 flex-1 rounded-full transition-colors duration-200 ease-out",
            segment.filled ? STAGE_CLASSES[segment.tone].bg : "bg-track",
          )}
        />
      ))}
    </div>
  );
}
