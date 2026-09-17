import { getCurrentMember } from "@/lib/data/team";
import { getTools } from "@/lib/data/tools";
import { MobileNav } from "./mobile-nav";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

/** The signed-in app shell: sidebar (desktop) / drawer (mobile) + top bar. */
export async function Shell({ children }: { children: React.ReactNode }) {
  const [tools, member] = await Promise.all([getTools(), getCurrentMember()]);

  return (
    <div className="flex min-h-screen">
      <Sidebar tools={tools} member={member} />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <MobileNav tools={tools} member={member} />
        <TopBar />
        <main className="min-w-0 flex-1 px-4 pb-16 md:px-8">{children}</main>
      </div>
    </div>
  );
}
