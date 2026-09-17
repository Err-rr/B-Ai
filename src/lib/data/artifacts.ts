import type { Artifact } from "@/lib/types/domain";
import { delay } from "./delay";
import { ARTIFACTS } from "./fixtures/artifacts";

export async function getRecentArtifacts(limit = 3): Promise<Artifact[]> {
  return delay(ARTIFACTS.slice(0, limit));
}

export async function getArtifacts(): Promise<Artifact[]> {
  return delay(ARTIFACTS);
}
