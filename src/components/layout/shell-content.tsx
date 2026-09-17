"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { useSidebar } from "./sidebar-context";

/** Offsets the main content by the fixed sidebar's current width. */
export function ShellContent({ children }: { children: ReactNode }) {
  const { collapsed } = useSidebar();

  return (
    <div
      className={cn(
        "flex min-h-screen min-w-0 flex-1 flex-col transition-[margin] duration-150 ease-out",
        collapsed ? "md:ml-20" : "md:ml-72",
      )}
    >
      {children}
    </div>
  );
}
