import type { Profile } from "@/lib/types/domain";
import { MEMBERS } from "./team";

const heera = MEMBERS.find((m) => m.id === "heera");
if (!heera) throw new Error("Fixture data error: member 'heera' not found");

export const PROFILE: Profile = {
  member: heera,
  school: "Young Founders School",
  stagesComplete: 4,
  totalSessions: 10,
  totalTimeMinutes: 338,
  contributions: [
    {
      sessionId: "pre",
      sessionTitle: "AI Readiness & Digital Citizenship",
      minutesSpent: 10,
      minutesTotal: 25,
    },
    {
      sessionId: "1",
      sessionTitle: "Problem & Solution",
      minutesSpent: 22,
      minutesTotal: 58,
    },
    {
      sessionId: "2",
      sessionTitle: "Team Formation & CXO Roles",
      minutesSpent: 18,
      minutesTotal: 42,
    },
    {
      sessionId: "3",
      sessionTitle: "Mentorship & Booking",
      minutesSpent: 15,
      minutesTotal: 30,
    },
    {
      sessionId: "4",
      sessionTitle: "Market, Competition & GTM",
      minutesSpent: 24,
      minutesTotal: 64,
    },
  ],
};
