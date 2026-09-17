import type { Tool } from "@/lib/types/domain";
import { delay } from "./delay";
import { TOOLS } from "./fixtures/tools";

export async function getTools(): Promise<Tool[]> {
  return delay(TOOLS);
}

export async function getTool(slug: string): Promise<Tool | undefined> {
  return delay(TOOLS.find((t) => t.slug === slug));
}
