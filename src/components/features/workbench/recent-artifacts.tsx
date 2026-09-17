import { FileCheck2 } from "lucide-react";
import type { Artifact } from "@/lib/types/domain";
import { Card } from "@/components/ui/card";
import { formatRelativeDate } from "@/lib/utils/format";

export function RecentArtifacts({ artifacts }: { artifacts: Artifact[] }) {
  if (artifacts.length === 0) {
    return (
      <section className="space-y-3">
        <h2 className="text-ink font-sans text-lg font-semibold">
          Recently completed
        </h2>
        <Card>
          <p className="text-ink-3 text-sm">
            Nothing committed yet — approved work will show up here.
          </p>
        </Card>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <h2 className="text-ink font-sans text-lg font-semibold">
        Recently completed
      </h2>
      <Card className="divide-line divide-y p-0">
        {artifacts.map((artifact) => (
          <div key={artifact.id} className="flex items-center gap-3 p-4">
            <span className="bg-success-bg text-success inline-flex size-9 shrink-0 items-center justify-center rounded-lg">
              <FileCheck2 className="size-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-ink truncate text-sm font-medium">
                {artifact.title}
              </p>
              <p className="text-ink-3 text-xs">
                {artifact.sessionTitle} · {artifact.committedBy}
              </p>
            </div>
            <span className="text-ink-3 shrink-0 text-xs">
              {formatRelativeDate(artifact.committedAt)}
            </span>
          </div>
        ))}
      </Card>
    </section>
  );
}
