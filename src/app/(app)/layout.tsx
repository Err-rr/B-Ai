import { Shell } from "@/components/layout/shell";

/**
 * Layout for the signed-in workspace and its tools and reference pages.
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
