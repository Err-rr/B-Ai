import type { Session } from "@/lib/types/domain";
import { SegmentedProgress } from "@/components/ui/segmented-progress";
import { SessionCard } from "./session-card";

export function SessionJourney({ sessions }: { sessions: Session[] }) {
  const completeCount = sessions.filter((s) => s.status === "complete").length;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-ink font-sans text-lg font-semibold">
          Your journey
        </h2>
        <span className="text-ink-3 text-xs">
          {completeCount} of {sessions.length} sessions
        </span>
      </div>
      <SegmentedProgress
        label="Bootcamp progress"
        segments={sessions.map((s) => ({
          tone: s.stage,
          filled: s.status !== "upcoming",
        }))}
      />
      <div className="flex gap-3 overflow-x-auto pb-2">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </section>
  );
}
