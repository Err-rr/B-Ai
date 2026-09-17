import { Sparkles } from "lucide-react";
import type { Venture } from "@/lib/types/domain";

export function VentureBanner({ venture }: { venture: Venture }) {
  return (
    <div className="bg-stage-learn-tint flex items-center gap-3 rounded-xl p-4">
      <Sparkles
        className="text-stage-learn size-4 shrink-0"
        aria-hidden="true"
      />
      <p className="text-ink-2 text-sm">
        <span className="text-eyebrow text-ink-3 mr-2 font-semibold uppercase">
          Pinned context
        </span>
        <span className="text-ink font-medium">{venture.name}</span> ·{" "}
        {venture.maturity} — {venture.description}
      </p>
    </div>
  );
}
