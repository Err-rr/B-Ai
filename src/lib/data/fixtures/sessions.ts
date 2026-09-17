import type { Session } from "@/lib/types/domain";

/**
 * The canonical 10 sessions + Pre, per the bootcamp curriculum. Four
 * are complete, "Product Logic & MVP" is current - matches the "4 of
 * 10 sessions" / "4/10 stages complete" figures used across fixtures.
 */
export const SESSIONS: Session[] = [
  {
    id: "pre",
    number: "Pre",
    title: "AI Readiness & Digital Citizenship",
    stage: "learn",
    artifact: "AI use pledge",
    status: "complete",
  },
  {
    id: "1",
    number: "1",
    title: "Problem & Solution",
    stage: "learn-to-build",
    artifact: "Problem statement",
    status: "complete",
  },
  {
    id: "2",
    number: "2",
    title: "Team Formation & CXO Roles",
    stage: "learn-to-build",
    artifact: "Team charter",
    status: "complete",
  },
  {
    id: "3",
    number: "3",
    title: "Mentorship & Booking",
    stage: "learn-to-build",
    artifact: "Mentor session booked",
    status: "complete",
  },
  {
    id: "4",
    number: "4",
    title: "Market, Competition & GTM",
    stage: "learn-to-build",
    artifact: "Competitive landscape map",
    status: "complete",
  },
  {
    id: "5",
    number: "5",
    title: "Product Logic & MVP",
    stage: "build",
    artifact: "MVP wireframe",
    status: "current",
  },
  {
    id: "6",
    number: "6",
    title: "Business Model Canvas",
    stage: "learn-to-build",
    artifact: "Business model canvas",
    status: "upcoming",
  },
  {
    id: "7",
    number: "7",
    title: "Financial Model",
    stage: "learn-to-build",
    artifact: "12-month financial model",
    status: "upcoming",
  },
  {
    id: "8",
    number: "8",
    title: "Pitch Deck & Visuals",
    stage: "build",
    artifact: "Pitch deck draft",
    status: "upcoming",
  },
  {
    id: "9",
    number: "9",
    title: "Pitch Practice & Feedback",
    stage: "launch",
    artifact: "Scored practice pitch",
    status: "upcoming",
  },
  {
    id: "10",
    number: "10",
    title: "Final Pitch Presentation",
    stage: "launch",
    artifact: "Final investor pitch",
    status: "upcoming",
  },
];
