"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import type { Member, Tool } from "@/lib/types/domain";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { EASE } from "@/lib/utils/motion";
import { useSafeReducedMotion } from "@/lib/utils/use-safe-reduced-motion";
import { SidebarNav } from "./sidebar-nav";

/** Top bar + slide-in drawer for < md. Desktop uses Sidebar instead. */
export function MobileNav({
  tools,
  member,
}: {
  tools: Tool[];
  member: Member;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useSafeReducedMotion();

  return (
    <>
      <header className="border-line bg-card sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 md:hidden">
        <span className="flex items-center gap-2">
          <Logo size={30} />
          <span className="font-display text-ink text-xl font-normal tracking-wide">
            Bootcamp AI
          </span>
        </span>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <Menu className="size-5" aria-hidden="true" />
        </Button>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="bg-card shadow-soft fixed inset-y-0 left-0 z-50 flex w-72 flex-col md:hidden"
              initial={reduceMotion ? { opacity: 0 } : { x: "-100%" }}
              animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: "-100%" }}
              transition={{
                duration: reduceMotion ? 0.1 : 0.28,
                ease: EASE.out,
              }}
            >
              <div className="border-line flex items-center justify-between border-b p-4">
                <span className="text-ink text-sm font-medium">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="size-5" aria-hidden="true" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto px-3 py-4">
                <SidebarNav tools={tools} onNavigate={() => setOpen(false)} />
              </div>
              <div className="border-line flex items-center border-t p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={member.name} size="sm" />
                  <div className="flex flex-col">
                    <span className="text-ink text-sm font-medium">
                      {member.name}
                    </span>
                    <span className="text-ink-3 text-xs">{member.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
