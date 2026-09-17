import { Sparkles } from "lucide-react";
import Link from "next/link";
import type { Member, Tool } from "@/lib/types/domain";
import { Avatar } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SidebarNav } from "./sidebar-nav";

/** The persistent desktop sidebar. Hidden below md — see MobileNav. */
export function Sidebar({ tools, member }: { tools: Tool[]; member: Member }) {
  return (
    <aside className="border-line bg-card hidden h-screen w-72 shrink-0 flex-col border-r md:flex">
      <div className="p-6">
        <Link href="/workbench" className="flex items-center gap-2">
          <span className="bg-green text-on-accent inline-flex size-8 items-center justify-center rounded-lg">
            <Sparkles className="size-4" aria-hidden="true" />
          </span>
          <span className="font-display text-ink text-xl font-normal">
            Bootcamp AI
          </span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        <SidebarNav tools={tools} />
      </div>

      <div className="border-line flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar name={member.name} size="sm" />
          <div className="flex flex-col">
            <span className="text-ink text-sm font-medium">{member.name}</span>
            <span className="text-ink-3 text-xs">{member.role}</span>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </aside>
  );
}
