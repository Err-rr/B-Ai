import { Shell } from "@/components/layout/shell";

/**
 * Layout for every signed-in route (Workbench, Chat, Tools, Knowledge,
 * Team, Profile) — the persistent sidebar shell.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
