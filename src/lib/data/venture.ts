import type { Venture } from "@/lib/types/domain";
import { delay } from "./delay";
import { VENTURE } from "./fixtures/venture";

export async function getVenture(): Promise<Venture> {
  return delay(VENTURE);
}
