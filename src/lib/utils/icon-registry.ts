import {
  Calculator,
  FlaskConical,
  LayoutGrid,
  type LucideIcon,
  MessagesSquare,
  Mic,
  Sparkles,
} from "lucide-react";

/**
 * Fixture data stores icon choices as plain strings (framework-agnostic
 * data layer, D-010) - this is the one place that resolves a name to
 * an actual component.
 */
const ICON_REGISTRY: Record<string, LucideIcon> = {
  FlaskConical,
  MessagesSquare,
  LayoutGrid,
  Mic,
  Calculator,
};

export function getToolIcon(name: string): LucideIcon {
  return ICON_REGISTRY[name] ?? Sparkles;
}
