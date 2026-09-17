import { getRecentArtifacts } from "@/lib/data/artifacts";
import { getNumberedSessions } from "@/lib/data/sessions";
import { getCurrentMember, getTeam } from "@/lib/data/team";
import { getTools } from "@/lib/data/tools";
import { getVenture } from "@/lib/data/venture";
import { ContinueCard } from "@/components/features/workbench/continue-card";
import { RecentArtifacts } from "@/components/features/workbench/recent-artifacts";
import { SessionJourney } from "@/components/features/workbench/session-journey";
import { TeamStrip } from "@/components/features/workbench/team-strip";
import { ToolGrid } from "@/components/features/workbench/tool-grid";
import { VentureCard } from "@/components/features/workbench/venture-card";

export default async function WorkbenchPage() {
  const [venture, sessions, tools, artifacts, team, member] =
    await Promise.all([
      getVenture(),
      getNumberedSessions(),
      getTools(),
      getRecentArtifacts(),
      getTeam(),
      getCurrentMember(),
    ]);

  const currentSession = sessions.find((s) => s.status === "current");

  return (
    <div className="space-y-8 py-6">
      <div>
        <p className="text-eyebrow text-ink-3 font-semibold uppercase">
          Founder&rsquo;s Workbench
        </p>
        <h1 className="text-ink font-sans text-3xl font-semibold">
          Hey {member.name.split(" ")[0]}
        </h1>
        <p className="text-ink-2 mt-1 text-sm">
          Pick a tool, or just keep talking to YFS-AI. Your venture context
          follows you everywhere.
        </p>
      </div>

      <VentureCard venture={venture} />

      {currentSession && <ContinueCard session={currentSession} />}

      <SessionJourney sessions={sessions} />

      <ToolGrid tools={tools} />

      <RecentArtifacts artifacts={artifacts} />

      <TeamStrip team={team} />
    </div>
  );
}
