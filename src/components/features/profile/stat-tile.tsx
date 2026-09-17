import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StatTile({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <span className="bg-stage-learn-tint text-stage-learn mb-3 inline-flex size-9 items-center justify-center rounded-lg">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <p className="text-ink-3 text-xs">{label}</p>
      <p className="font-display text-ink mt-1 text-4xl font-normal">{value}</p>
    </Card>
  );
}
