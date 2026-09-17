import { Card } from "@/components/ui/card";

export function MissionCard({ mission }: { mission: string }) {
  return (
    <Card>
      <p className="text-eyebrow text-ink-3 font-semibold uppercase">Mission</p>
      <p className="text-ink mt-2 text-lg">{mission}</p>
    </Card>
  );
}
