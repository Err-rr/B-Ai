import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Team } from "@/lib/types/domain";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export function TeamStrip({ team }: { team: Team }) {
  return (
    <Card className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="flex -space-x-2">
          {team.members.map((member) => (
            <Avatar
              key={member.id}
              name={member.name}
              size="sm"
              className="ring-card ring-2"
            />
          ))}
        </div>
        <div>
          <p className="text-ink text-sm font-medium">{team.name}</p>
          <p className="text-ink-3 text-xs">
            {team.members.map((m) => m.role).join(" · ")}
          </p>
        </div>
      </div>
      <Link
        href="/team"
        className="text-ink-2 hover:text-ink flex items-center gap-1 text-sm font-medium transition-colors duration-150 ease-out"
      >
        View team
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </Card>
  );
}
