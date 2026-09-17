import { GraduationCap, Mail } from "lucide-react";
import type { Profile } from "@/lib/types/domain";
import { Avatar } from "@/components/ui/avatar";

export function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <div className="bg-tint-lavender flex flex-col items-start gap-4 rounded-2xl p-8 sm:flex-row sm:items-center">
      <Avatar name={profile.member.name} size="lg" />
      <div>
        <h1 className="text-ink font-sans text-2xl font-semibold">
          {profile.member.name}
        </h1>
        <p className="text-ink-2 text-sm">
          {profile.member.role} · Team Helios
        </p>
        <div className="text-ink-3 mt-2 flex flex-col flex-wrap gap-x-4 gap-y-1 text-sm sm:flex-row">
          <span className="flex items-center gap-1.5">
            <Mail className="size-3.5" aria-hidden="true" />
            {profile.member.email}
          </span>
          <span className="flex items-center gap-1.5">
            <GraduationCap className="size-3.5" aria-hidden="true" />
            {profile.school}
          </span>
        </div>
      </div>
    </div>
  );
}
