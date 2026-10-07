import {
  Code2,
  Compass,
  HeartHandshake,
  Megaphone,
  Palette,
  PiggyBank,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import type { CXORole } from "@/lib/types/domain";

export interface RoleOption {
  role: CXORole;
  icon: LucideIcon;
  leads: string;
  peeks: string[];
}

export const ROLE_OPTIONS: RoleOption[] = [
  {
    role: "CEO",
    icon: Rocket,
    leads: "· Chief Executive Officer",
    peeks: [
      "Own the narrative arc",
      "Lead investor Q&A",
      "Set the two-day vision",
    ],
  },
  {
    role: "CTO",
    icon: Code2,
    leads: "· Chief Technology Officer",
    peeks: ["Scope the MVP", "Own the demo", "Call the tech tradeoffs"],
  },
  {
    role: "CMO",
    icon: Megaphone,
    leads: "· Chief Marketing Officer",
    peeks: [
      "Map the competition",
      "Own the GTM plan",
      "Shape the pitch narrative",
    ],
  },
  {
    role: "CFO",
    icon: PiggyBank,
    leads: "· Chief Financial Officer",
    peeks: [
      "Build the financial model",
      "Own unit economics",
      "Defend the numbers",
    ],
  },
  {
    role: "CDO",
    icon: Palette,
    leads: "· Chief Design Officer",
    peeks: ["Shape the user experience", "Build the brand identity", "Make ideas tangible"],
  },
  {
    role: "CIO",
    icon: HeartHandshake,
    leads: "· Chief Impact Officer",
    peeks: ["Define the impact", "Measure outcomes", "Keep the mission in focus"],
  },
  {
    role: "CSO",
    icon: Compass,
    leads: "· Chief Strategy Officer",
    peeks: ["Set strategic priorities", "Find growth opportunities", "Connect the big picture"],
  },
];
