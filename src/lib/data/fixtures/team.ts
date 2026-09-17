import type { Member, Team } from "@/lib/types/domain";

export const MEMBERS: Member[] = [
  {
    id: "heera",
    name: "Heera Basnet",
    role: "CEO",
    email: "heera@youngfoundersschool.school",
  },
  {
    id: "ravi",
    name: "Ravi Kumar",
    role: "CTO",
    email: "ravi@youngfoundersschool.school",
  },
  {
    id: "mei",
    name: "Mei Tanaka",
    role: "CMO",
    email: "mei@youngfoundersschool.school",
  },
  {
    id: "jamal",
    name: "Jamal Hussein",
    role: "CFO",
    email: "jamal@youngfoundersschool.school",
  },
];

export const TEAM: Team = {
  id: "team-helios",
  name: "Team Helios",
  mission:
    "Help high-school students discover and pursue careers in deep tech through AI-powered mentorship.",
  members: MEMBERS,
};

/** The signed-in student for this mock session — always Heera. */
export const CURRENT_MEMBER_ID = "heera";
