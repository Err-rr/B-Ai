import type { Member } from "@/lib/types/domain";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export function MemberCard({ member }: { member: Member }) {
  return (
    <Card className="flex items-center gap-3">
      <Avatar name={member.name} size="lg" />
      <div className="min-w-0">
        <p className="text-ink truncate text-sm font-medium">{member.name}</p>
        <p className="text-ink-3 text-xs">{member.role}</p>
      </div>
    </Card>
  );
}
