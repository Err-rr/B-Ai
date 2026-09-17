import { getContributions } from "@/lib/data/contributions";
import { getNumberedSessions } from "@/lib/data/sessions";
import { getTeam } from "@/lib/data/team";
import { ContributionHeatmap } from "@/components/features/team/contribution-heatmap";
import { MemberCard } from "@/components/features/team/member-card";
import { MissionCard } from "@/components/features/team/mission-card";

export default async function TeamPage() {
  const [team, sessions, contributions] = await Promise.all([
    getTeam(),
    getNumberedSessions(),
    getContributions(),
  ]);

  return (
    <div className="space-y-6 py-6">
      <div>
        <p className="text-eyebrow text-ink-3 font-semibold uppercase">
          Workspace
        </p>
        <h1 className="text-ink font-sans text-3xl font-semibold">
          {team.name}
        </h1>
      </div>

      <MissionCard mission={team.mission} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {team.members.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="text-ink font-sans text-lg font-semibold">
          Contribution heatmap
        </h2>
        <ContributionHeatmap
          members={team.members}
          sessions={sessions}
          contributions={contributions}
        />
      </div>
    </div>
  );
}
