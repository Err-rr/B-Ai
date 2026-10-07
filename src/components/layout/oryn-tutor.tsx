"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

interface TutorMessage {
  id: number;
  from: "oryn" | "student";
  text: string;
}

const INITIAL_MESSAGES: TutorMessage[] = [
  {
    id: 1,
    from: "oryn",
    text: "Hi Shivam! I’m Oryn, your AI startup tutor. I’m here to help you think through your next step.",
  },
  {
    id: 2,
    from: "oryn",
    text: "Start with the student you want to help. What do you know about a challenge they face?",
  },
];

function getWorkContext(pathname: string) {
  if (pathname.startsWith("/tools/")) {
    const slug = pathname.split("/").pop() ?? "";
    const title = slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return `Working on ${title}`;
  }
  if (pathname === "/team") return "Your team";
  if (pathname === "/profile") return "Your progress";
  if (pathname === "/submit-idea") return "Your idea";
  return "Your startup journey";
}

export function OrynTutor() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const context = getWorkContext(pathname);

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), from: "student", text },
      {
        id: Date.now() + 1,
        from: "oryn",
        text: `That’s a useful place to explore. As you work on ${context.toLowerCase()}, what’s one small thing you could learn from a real student?`,
      },
    ]);
    setInput("");
  }

  return (
    <>
      <aside className="border-line bg-card hidden h-screen w-64 shrink-0 flex-col border-l md:sticky md:top-0 md:flex lg:w-80">
        <TutorPanel
          context={context}
          input={input}
          messages={messages}
          onInput={setInput}
          onSend={sendMessage}
        />
      </aside>

      <Button
        type="button"
        size="icon"
        aria-label={open ? "Close Oryn chat" : "Open Oryn chat"}
        onClick={() => setOpen((visible) => !visible)}
        className="fixed right-5 bottom-5 z-40 size-14 rounded-full shadow-lg md:hidden"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Chat with Oryn"
            className="border-line bg-card shadow-soft fixed right-4 bottom-24 z-40 flex h-[min(70vh,36rem)] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border md:hidden"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
          >
            <TutorPanel
              context={context}
              input={input}
              messages={messages}
              onInput={setInput}
              onSend={sendMessage}
              onClose={() => setOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TutorPanel({
  context,
  input,
  messages,
  onInput,
  onSend,
  onClose,
}: {
  context: string;
  input: string;
  messages: TutorMessage[];
  onInput: (value: string) => void;
  onSend: (event: FormEvent<HTMLFormElement>) => void;
  onClose?: () => void;
}) {
  return (
    <>
      <header className="border-line flex items-center gap-3 border-b p-4">
        <Logo size={38} alt="YFS logo" />
        <div className="min-w-0 flex-1">
          <h2 className="text-ink font-sans text-base font-semibold">Oryn</h2>
          <p className="text-ink-2 text-xs">Your AI Startup Tutor</p>
        </div>
        {onClose && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close Oryn chat"
            onClick={onClose}
          >
            <X className="size-4" />
          </Button>
        )}
      </header>

      <div className="border-line bg-paper/60 border-b px-4 py-2">
        <p className="text-ink-3 truncate text-xs">{context}</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[92%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed ${
              message.from === "oryn"
                ? "bg-paper text-ink rounded-tl-sm"
                : "bg-green text-on-accent ml-auto rounded-tr-sm"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>

      <form onSubmit={onSend} className="border-line flex gap-2 border-t p-3">
        <input
          value={input}
          onChange={(event) => onInput(event.target.value)}
          aria-label="Message Oryn"
          placeholder="Ask Oryn for a nudge..."
          className="border-line bg-paper text-ink placeholder:text-ink-3 min-w-0 flex-1 rounded-xl border px-3 py-2.5 text-sm"
        />
        <Button type="submit" size="icon" disabled={!input.trim()} aria-label="Send message">
          <Send className="size-4" aria-hidden="true" />
        </Button>
      </form>
    </>
  );
}
