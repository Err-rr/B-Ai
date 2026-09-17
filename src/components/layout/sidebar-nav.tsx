"use client";

import {
  BookOpen,
  LayoutDashboard,
  MessageCircle,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Tool } from "@/lib/types/domain";
import { cn } from "@/lib/utils/cn";
import { getToolIcon } from "@/lib/utils/icon-registry";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const WORKSPACE_ITEMS: NavItem[] = [
  { href: "/workbench", label: "Workbench", icon: LayoutDashboard },
  { href: "/chat", label: "Chat with YFS-AI", icon: MessageCircle },
];

const REFERENCE_ITEMS: NavItem[] = [
  { href: "/knowledge", label: "Knowledge", icon: BookOpen },
  { href: "/team", label: "Team", icon: Users },
  { href: "/profile", label: "Profile", icon: User },
];

function NavGroup({
  label,
  items,
  pathname,
  onNavigate,
}: {
  label: string;
  items: NavItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="space-y-1">
      <p className="text-eyebrow text-ink-3 px-3 font-semibold uppercase">
        {label}
      </p>
      {items.map((item) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg border-l-2 px-3 py-2 text-sm transition-colors duration-150 ease-out",
              active
                ? "bg-stage-learn-tint border-green text-ink font-medium"
                : "text-ink-2 hover:bg-paper hover:text-ink border-transparent",
            )}
          >
            <item.icon className="size-5 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}

export function SidebarNav({
  tools,
  onNavigate,
}: {
  tools: Tool[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const toolItems: NavItem[] = tools.map((tool) => ({
    href: `/tools/${tool.slug}`,
    label: tool.title,
    icon: getToolIcon(tool.icon),
  }));

  return (
    <nav className="flex flex-col gap-6">
      <NavGroup
        label="Workspace"
        items={WORKSPACE_ITEMS}
        pathname={pathname}
        onNavigate={onNavigate}
      />
      <NavGroup
        label="Tools"
        items={toolItems}
        pathname={pathname}
        onNavigate={onNavigate}
      />
      <NavGroup
        label="Reference"
        items={REFERENCE_ITEMS}
        pathname={pathname}
        onNavigate={onNavigate}
      />
    </nav>
  );
}
