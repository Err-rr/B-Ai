import { Fragment } from "react";
import type { Contribution, Member, Session } from "@/lib/types/domain";
import type { Stage } from "@/lib/types/stage";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

/**
 * Fully literal per-stage, per-intensity classes - Tailwind's scanner
 * can't see a class built by string concatenation at runtime (e.g.
 * `${stage.bg}/25`), so every combination is spelled out here.
 */
const INTENSITY_CLASSES: Record<Stage, Record<1 | 2 | 3, string>> = {
  learn: {
    1: "bg-stage-learn/25",
    2: "bg-stage-learn/55",
    3: "bg-stage-learn",
  },
  "learn-to-build": {
    1: "bg-stage-learn-to-build/25",
    2: "bg-stage-learn-to-build/55",
    3: "bg-stage-learn-to-build",
  },
  build: {
    1: "bg-stage-build/25",
    2: "bg-stage-build/55",
    3: "bg-stage-build",
  },
  launch: {
    1: "bg-stage-launch/25",
    2: "bg-stage-launch/55",
    3: "bg-stage-launch",
  },
};

function cellClasses(session: Session, intensity: 0 | 1 | 2 | 3) {
  if (intensity === 0) return "bg-paper";
  return INTENSITY_CLASSES[session.stage][intensity];
}

export function ContributionHeatmap({
  members,
  sessions,
  contributions,
}: {
  members: Member[];
  sessions: Session[];
  contributions: Contribution[];
}) {
  function intensityFor(memberId: string, sessionId: string) {
    return (
      contributions.find(
        (c) => c.memberId === memberId && c.sessionId === sessionId,
      )?.intensity ?? 0
    );
  }

  return (
    <Card className="w-full max-w-sm overflow-x-auto">
      <div className="grid min-w-[360px] grid-cols-[72px_repeat(10,1fr)] gap-1.5">
        <span />
        {sessions.map((session) => (
          <span
            key={session.id}
            className="text-ink-3 text-center text-xs font-medium"
          >
            {session.number}
          </span>
        ))}
        {members.map((member) => (
          <Fragment key={member.id}>
            <span className="text-ink truncate text-sm">
              {member.name.split(" ")[0]}
            </span>
            {sessions.map((session) => (
              <div
                key={`${member.id}-${session.id}`}
                title={`${member.name} · Session ${session.number}`}
                className={cn(
                  "aspect-square rounded-md",
                  cellClasses(session, intensityFor(member.id, session.id)),
                )}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </Card>
  );
}
