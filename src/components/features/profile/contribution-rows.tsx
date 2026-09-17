import type { SessionTimeLog } from "@/lib/types/domain";
import { Card } from "@/components/ui/card";

export function ContributionRows({
  contributions,
}: {
  contributions: SessionTimeLog[];
}) {
  return (
    <Card className="divide-line divide-y p-0">
      {contributions.map((log, index) => (
        <div key={log.sessionId} className="flex items-center gap-4 p-4">
          <span className="text-ink-3 w-6 shrink-0 text-sm font-medium">
            {index + 1}
          </span>
          <span className="text-ink flex-1 text-sm font-medium">
            {log.sessionTitle}
          </span>
          <span className="text-ink-3 shrink-0 text-xs">
            {log.minutesSpent}m of {log.minutesTotal}m
          </span>
        </div>
      ))}
    </Card>
  );
}
