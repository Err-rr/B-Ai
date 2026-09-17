import type { Member, Team } from "@/lib/types/domain";
import { delay } from "./delay";
import { CURRENT_MEMBER_ID, MEMBERS, TEAM } from "./fixtures/team";

export async function getTeam(): Promise<Team> {
  return delay(TEAM);
}

export async function getCurrentMember(): Promise<Member> {
  const member = MEMBERS.find((m) => m.id === CURRENT_MEMBER_ID);
  if (!member) throw new Error("Fixture data error: current member not found");
  return delay(member);
}
