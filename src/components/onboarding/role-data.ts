import {
  Code2,
  Megaphone,
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
    leads: "Vision, pitch, and the room.",
    peeks: [
      "Own the narrative arc",
      "Lead investor Q&A",
      "Set the two-day vision",
    ],
  },
  {
    role: "CTO",
    icon: Code2,
    leads: "Product and the build.",
    peeks: ["Scope the MVP", "Own the demo", "Call the tech tradeoffs"],
  },
  {
    role: "CMO",
    icon: Megaphone,
    leads: "Story and the market.",
    peeks: [
      "Map the competition",
      "Own the GTM plan",
      "Shape the pitch narrative",
    ],
  },
  {
    role: "CFO",
    icon: PiggyBank,
    leads: "Numbers and the model.",
    peeks: [
      "Build the financial model",
      "Own unit economics",
      "Defend the numbers",
    ],
  },
];
