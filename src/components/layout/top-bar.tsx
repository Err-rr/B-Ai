import { CheckCircle2, FileCheck2 } from "lucide-react";
import { getArtifacts } from "@/lib/data/artifacts";
import { getNumberedSessions } from "@/lib/data/sessions";
import { StatPill } from "@/components/ui/stat-pill";

/** Few and honest - sessions complete, artifacts approved. */
export async function TopBar() {
  const [sessions, artifacts] = await Promise.all([
    getNumberedSessions(),
    getArtifacts(),
  ]);
  const completeCount = sessions.filter((s) => s.status === "complete").length;
  const approvedCount = artifacts.filter((a) => a.status === "approved").length;

  return (
    <div className="flex items-center gap-3 px-4 py-4 md:px-8">
      <StatPill
        icon={CheckCircle2}
        value={completeCount}
        label="sessions complete"
      />
      <StatPill
        icon={FileCheck2}
        value={approvedCount}
        label="artifacts approved"
      />
    </div>
  );
}
