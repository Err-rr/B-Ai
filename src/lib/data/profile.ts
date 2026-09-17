import type { Profile } from "@/lib/types/domain";
import { delay } from "./delay";
import { PROFILE } from "./fixtures/profile";

export async function getProfile(): Promise<Profile> {
  return delay(PROFILE);
}
