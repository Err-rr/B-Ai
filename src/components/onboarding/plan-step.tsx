import type { Session } from "@/lib/types/domain";
import { STAGE_CLASSES, STAGE_LABEL } from "@/lib/utils/stage";

export function PlanStep({ sessions }: { sessions: Session[] }) {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="border-line bg-card flex w-28 shrink-0 flex-col gap-2 rounded-xl border p-3"
          >
            <span
              className={`size-2 rounded-full ${STAGE_CLASSES[session.stage].bg}`}
            />
            <span className="text-ink-3 text-xs">{session.number}</span>
            <span className="text-ink line-clamp-2 text-xs font-medium">
              {session.title}
            </span>
          </div>
        ))}
      </div>
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
