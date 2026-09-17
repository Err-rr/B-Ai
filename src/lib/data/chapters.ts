import type { Chapter } from "@/lib/types/domain";
import { delay } from "./delay";
import { CHAPTERS } from "./fixtures/chapters";

export async function getChapters(): Promise<Chapter[]> {
  return delay(CHAPTERS);
}
