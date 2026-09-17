import { Pencil } from "lucide-react";
import type { Venture } from "@/lib/types/domain";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function VentureCard({ venture }: { venture: Venture }) {
  return (
    <Card className="flex items-start justify-between gap-4">
      <div>
        <p className="text-eyebrow text-ink-3 mb-2 font-semibold uppercase">
          Your venture
        </p>
        <h2 className="text-ink font-sans text-2xl font-semibold">
          {venture.name}
        </h2>
        <p className="text-ink-2 mt-1 text-sm">{venture.description}</p>
        <Badge tone={venture.stage} className="mt-3">
          Stage · {venture.maturity}
        </Badge>
      </div>
      <button
        type="button"
        aria-label="Edit venture"
        className="text-ink-3 hover:text-ink hover:bg-paper inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-colors duration-150 ease-out"
      >
        <Pencil className="size-4" aria-hidden="true" />
      </button>
    </Card>
  );
}
