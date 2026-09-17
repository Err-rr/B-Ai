import type { Session } from "@/lib/types/domain";
import { Card } from "@/components/ui/card";
import { SessionMarquee } from "@/components/shared/session-marquee";
import { STAGE_CLASSES, STAGE_LABEL } from "@/lib/utils/stage";

export function PlanStep({ sessions }: { sessions: Session[] }) {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card padding="sm">
        <SessionMarquee sessions={sessions} />
      </Card>
      <div className="flex flex-wrap gap-4">
        {(["learn", "learn-to-build", "build", "launch"] as const).map(
          (stage) => (
            <span
              key={stage}
              className="text-ink-2 flex items-center gap-1.5 text-xs"
            >
              <span
                className={`size-2 rounded-full ${STAGE_CLASSES[stage].bg}`}
              />
              {STAGE_LABEL[stage]}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
