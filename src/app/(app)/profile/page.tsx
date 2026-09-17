import { Clock, FileCheck2, Trophy } from "lucide-react";
import { getArtifacts } from "@/lib/data/artifacts";
import { getProfile } from "@/lib/data/profile";
import { ContributionRows } from "@/components/features/profile/contribution-rows";
import { ProfileHeader } from "@/components/features/profile/profile-header";
import { StatTile } from "@/components/features/profile/stat-tile";
import { formatMinutes } from "@/lib/utils/format";

export default async function ProfilePage() {
  const [profile, artifacts] = await Promise.all([
    getProfile(),
    getArtifacts(),
  ]);
  const committedCount = artifacts.filter(
    (a) => a.committedBy === profile.member.name,
  ).length;

  return (
    <div className="space-y-6 py-6">
      <ProfileHeader profile={profile} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatTile
          icon={Trophy}
          label="Stages complete"
          value={`${profile.stagesComplete}/${profile.totalSessions}`}
        />
        <StatTile
          icon={Clock}
          label="Total time on platform"
          value={formatMinutes(profile.totalTimeMinutes)}
        />
        <StatTile
          icon={FileCheck2}
          label="Artifacts committed"
          value={String(committedCount)}
        />
      </div>

      <div className="space-y-3">
        <h2 className="text-ink font-sans text-lg font-semibold">
          My contribution
        </h2>
        <ContributionRows contributions={profile.contributions} />
      </div>
    </div>
  );
}
