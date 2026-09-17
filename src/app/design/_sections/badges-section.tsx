import { CheckCircle2, Flame } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatPill } from "@/components/ui/stat-pill";
import { Section } from "./section";

export function BadgesSection() {
  return (
    <Section title="Badges, avatars & stat pills">
      <div className="flex flex-wrap gap-2">
        <Badge tone="learn">Learn</Badge>
        <Badge tone="learn-to-build">Learn to Build</Badge>
        <Badge tone="build">Build</Badge>
        <Badge tone="launch">Launch</Badge>
        <Badge tone="success">Approved</Badge>
        <Badge tone="warning">Needs review</Badge>
        <Badge tone="danger">Blocked</Badge>
        <Badge tone="neutral">CEO</Badge>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Avatar name="Ananya Rao" size="sm" />
        <Avatar name="Devika Iyer" size="md" />
        <Avatar name="Kabir Shah" size="lg" />
      </div>

      <div className="flex flex-wrap gap-3">
        <StatPill icon={CheckCircle2} value={4} label="sessions complete" />
        <StatPill icon={Flame} value={7} label="artifacts approved" />
      </div>
    </Section>
  );
}
