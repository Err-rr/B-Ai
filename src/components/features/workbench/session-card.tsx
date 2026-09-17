import { Check } from "lucide-react";
import type { Session } from "@/lib/types/domain";
import { cn } from "@/lib/utils/cn";
import { STAGE_CLASSES } from "@/lib/utils/stage";

export function SessionCard({ session }: { session: Session }) {
  const stage = STAGE_CLASSES[session.stage];
  const isComplete = session.status === "complete";
  const isCurrent = session.status === "current";

  return (
    <div
      className={cn(
        "flex w-36 shrink-0 flex-col gap-3 rounded-xl border p-4 transition-transform duration-200 ease-out",
        isCurrent && `shadow-soft scale-105 border-transparent ${stage.tintBg}`,
        isComplete && "border-line bg-card",
        !isCurrent && !isComplete && "border-line bg-paper opacity-70",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-ink-3 text-xs font-medium">
          Session {session.number}
        </span>
        {isComplete && (
          <span
            className={cn(
              "flex size-5 items-center justify-center rounded-full",
              stage.bg,
            )}
          >
            <Check className="text-on-accent size-3" aria-hidden="true" />
          </span>
        )}
        {isCurrent && <span className={cn("size-2 rounded-full", stage.bg)} />}
      </div>
      <p
        className={cn(
          "line-clamp-2 text-sm font-medium",
          isCurrent || isComplete ? "text-ink" : "text-ink-3",
        )}
      >
        {session.title}
      </p>
    </div>
  );
}
