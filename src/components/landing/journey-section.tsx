import type { Session } from "@/lib/types/domain";
import { Card } from "@/components/ui/card";
import { STAGE_CLASSES, STAGE_LABEL } from "@/lib/utils/stage";

export function JourneySection({ sessions }: { sessions: Session[] }) {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <div className="bg-tint-lavender rounded-2xl p-8 md:p-12">
        <p className="text-eyebrow text-ink-3 font-semibold uppercase">
          The journey
        </p>
        <h2 className="font-display text-ink mt-2 text-4xl font-normal">
          One arc, four stages.
        </h2>
        <p className="text-ink-2 mt-2 max-w-xl text-sm">
          Every session has a color because every session moves you further
          along it — from your first problem statement to the pitch that proves
          you solved it.
        </p>

        <Card className="mt-8 overflow-x-auto">
          <div className="flex gap-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className="flex w-32 shrink-0 flex-col gap-2 rounded-lg p-3"
              >
                <span
                  className={`size-2 rounded-full ${STAGE_CLASSES[session.stage].bg}`}
                />
                <span className="text-ink-3 text-xs">
                  Session {session.number}
                </span>
                <span className="text-ink line-clamp-2 text-xs font-medium">
                  {session.title}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-6 flex flex-wrap gap-5">
          {(["learn", "learn-to-build", "build", "launch"] as const).map(
            (stage) => (
              <span
                key={stage}
                className="text-ink-2 flex items-center gap-2 text-sm"
              >
                <span
                  className={`size-2.5 rounded-full ${STAGE_CLASSES[stage].bg}`}
                />
                {STAGE_LABEL[stage]}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
