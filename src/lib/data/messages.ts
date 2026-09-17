import type { Message } from "@/lib/types/domain";
import { delay } from "./delay";
import { INITIAL_MESSAGES } from "./fixtures/messages";

export async function getInitialMessages(): Promise<Message[]> {
  return delay(INITIAL_MESSAGES);
}

const REPLIES = [
  "Good instinct. Before you commit to that, what evidence do you already have - a conversation, a data point, anything real? If it's thin, that's your next move, not the plan itself.",
  "That's a reasonable first pass. Now argue the other side: what would make a skeptical mentor say no? Write that down before you show anyone this.",
  "I can help you structure that, but I won't write it for you - this decision is yours to own. Want to open the right tool from the Workbench, or talk it through here first?",
  "Sounds like you're closer than you think. What's the smallest version of this you could test with a real customer this week?",
];

let replyIndex = 0;

/**
 * A canned founder-coach reply - there is no real model behind this.
 * Rotates through a small set so a demo conversation doesn't repeat
 * itself immediately. Replace this function's body when a real
 * backend is wired up; call sites never change (see D-010).
 */
export async function getAssistantReply(): Promise<Message> {
  const content = REPLIES[replyIndex % REPLIES.length];
  replyIndex += 1;
  return delay(
    {
      id: `msg-${Date.now()}`,
      role: "assistant",
      content,
      createdAt: new Date().toISOString(),
    },
    900,
  );
}
