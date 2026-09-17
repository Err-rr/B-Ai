import type { Contribution } from "@/lib/types/domain";
import { delay } from "./delay";
import { CONTRIBUTIONS } from "./fixtures/contributions";

export async function getContributions(): Promise<Contribution[]> {
  return delay(CONTRIBUTIONS);
}
