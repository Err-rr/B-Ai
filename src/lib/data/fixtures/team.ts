import type { Member, Team } from "@/lib/types/domain";

export const MEMBERS: Member[] = [
  {
    id: "heera",
    name: "Shivam Kumar",
    role: "CEO",
    email: "shivam@yfs.com",
  },
  {
    id: "ravi",
    name: "Sinu",
    role: "CTO",
    email: "sinu@youngfoundersschool.school",
  },
  {
    id: "mei",
    name: "Ananya",
    role: "CMO",
    email: "ananya@youngfoundersschool.school",
  },
  {
    id: "jamal",
    name: "Shritij",
    role: "CFO",
    email: "shritij@youngfoundersschool.school",
  },
];

export const TEAM: Team = {
  id: "team-helios",
  name: "Team Helios",
  mission:
    "Help high-school students discover and pursue careers in deep tech through AI-powered mentorship.",
  members: MEMBERS,
};

/** The signed-in student for this mock session - always Shivam. */
export const CURRENT_MEMBER_ID = "heera";
