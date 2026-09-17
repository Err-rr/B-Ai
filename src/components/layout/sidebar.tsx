"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import Link from "next/link";
import type { Member, Tool } from "@/lib/types/domain";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils/cn";
import { useSidebar } from "./sidebar-context";
import { SidebarNav } from "./sidebar-nav";

/** The persistent desktop sidebar - fixed to the viewport, collapsible. */
export function Sidebar({ tools, member }: { tools: Tool[]; member: Member }) {
  const { collapsed, toggle } = useSidebar();

  return (
    <aside
      className={cn(
        "border-line bg-card fixed inset-y-0 left-0 z-20 hidden h-screen shrink-0 flex-col border-r transition-[width] duration-150 ease-out md:flex",
        collapsed ? "w-20" : "w-72",
      )}
    >
      <div
        className={cn(
          "flex gap-2 p-4",
          collapsed
            ? "flex-col items-center"
            : "items-center justify-between",
        )}
      >
        <Link href="/workbench" className="flex min-w-0 items-center gap-2">
          <Logo size={32} />
          {!collapsed && (
            <span className="font-display text-ink truncate text-2xl font-normal tracking-wide">
              Bootcamp AI
            </span>
          )}
        </Link>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={toggle}
          className="shrink-0"
        >
          {collapsed ? (
            <PanelLeftOpen className="size-5" aria-hidden="true" />
          ) : (
            <PanelLeftClose className="size-5" aria-hidden="true" />
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        <SidebarNav tools={tools} collapsed={collapsed} />
      </div>

      <div
        className={cn(
          "border-line flex items-center border-t p-4",
          collapsed ? "justify-center" : "justify-between",
        )}
      >
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={member.name} size="sm" />
          {!collapsed && (
            <div className="flex min-w-0 flex-col">
              <span className="text-ink truncate text-sm font-medium">
                {member.name}
              </span>
              <span className="text-ink-3 truncate text-xs">
                {member.role}
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
