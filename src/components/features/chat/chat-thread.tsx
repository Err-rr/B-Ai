"use client";

import { PartyPopper, RotateCcw, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Message, Session, Venture } from "@/lib/types/domain";
import { getAssistantReply } from "@/lib/data/messages";
import { Button } from "@/components/ui/button";
import { AIThinkingLoader } from "@/components/ui/loaders/ai-thinking-loader";
import { CelebrationModal } from "./celebration-modal";
import { MessageBubble } from "./message-bubble";
import { VentureBanner } from "./venture-banner";

const THINKING_MESSAGES = [
  "Reading your message",
  "Checking Sparkpath's context",
  "Drafting a reply",
];

export function ChatThread({
  venture,
  initialMessages,
  currentSession,
}: {
  venture: Venture;
  initialMessages: Message[];
  currentSession?: Session;
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  async function handleSend(event: React.FormEvent) {
    event.preventDefault();
    const content = input.trim();
    if (!content || sending) return;

    setMessages((current) => [
      ...current,
      {
        id: `user-${Date.now()}`,
        role: "user",
        content,
        createdAt: new Date().toISOString(),
      },
    ]);
    setInput("");
    setSending(true);
    const reply = await getAssistantReply();
    setMessages((current) => [...current, reply]);
    setSending(false);
  }

  function handleReset() {
    setMessages(initialMessages);
    setInput("");
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] flex-col">
      <div className="flex items-center justify-between gap-3 py-4">
        <div>
          <h1 className="text-ink font-sans text-2xl font-semibold">
            Chat with YFS-AI
          </h1>
          <p className="text-ink-2 text-sm">
            Persistent. Your venture context is always loaded.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {currentSession && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCelebrating(true)}
            >
              <PartyPopper className="text-success size-4" aria-hidden="true" />
              Approve session
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset
          </Button>
        </div>
      </div>

      <VentureBanner venture={venture} />

      <div className="flex-1 space-y-6 overflow-y-auto py-6">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {sending && (
          <div className="border-line bg-card max-w-2xl rounded-2xl border p-6">
            <AIThinkingLoader messages={THINKING_MESSAGES} />
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-3 py-4">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask YFS-AI anything about your venture…"
          className="border-line bg-card text-ink placeholder:text-ink-3 hover:border-border-hover flex-1 rounded-xl border px-4 py-3 text-sm transition-colors duration-150 ease-out"
        />
        <Button type="submit" disabled={!input.trim() || sending}>
          Send
          <Send className="size-4" aria-hidden="true" />
        </Button>
      </form>

      {currentSession && (
        <CelebrationModal
          session={currentSession}
          open={celebrating}
          onClose={() => setCelebrating(false)}
        />
      )}
    </div>
  );
}
