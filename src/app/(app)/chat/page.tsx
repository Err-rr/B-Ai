import { getInitialMessages } from "@/lib/data/messages";
import { getCurrentSession } from "@/lib/data/sessions";
import { getVenture } from "@/lib/data/venture";
import { ChatThread } from "@/components/features/chat/chat-thread";

export default async function ChatPage() {
  const [venture, initialMessages, currentSession] = await Promise.all([
    getVenture(),
    getInitialMessages(),
    getCurrentSession(),
  ]);

  return (
    <ChatThread
      venture={venture}
      initialMessages={initialMessages}
      currentSession={currentSession}
    />
  );
}
