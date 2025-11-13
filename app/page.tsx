"use client";

import { useState, useRef, FormEvent } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: crypto.randomUUID(), role: "assistant", content: "Welcome to ChatPT Atlas. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isSending) return;
    setIsSending(true);

    const userMessage: Message = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = (await res.json()) as { reply: string };
      const reply: Message = { id: crypto.randomUUID(), role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, reply]);
    } catch (err) {
      const reply: Message = { id: crypto.randomUUID(), role: "assistant", content: "Sorry, something went wrong." };
      setMessages((prev) => [...prev, reply]);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <header className="py-6">
        <h1 className="text-3xl font-bold tracking-tight">ChatPT Atlas</h1>
        <p className="text-slate-600">A minimal chat interface running on Next.js.</p>
      </header>

      <section className="space-y-4">
        <div className="bg-white border rounded-xl p-4 shadow-sm h-[60vh] overflow-y-auto">
          <ul className="space-y-3">
            {messages.map((m) => (
              <li key={m.id} className={m.role === "user" ? "text-right" : "text-left"}>
                <span
                  className={
                    "inline-block px-3 py-2 rounded-lg max-w-[85%] " +
                    (m.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-900 border")
                  }
                >
                  {m.content}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isSending}
            className="rounded-lg bg-blue-600 text-white px-4 py-2 disabled:opacity-50"
          >
            {isSending ? "Sending..." : "Send"}
          </button>
        </form>
      </section>

      <footer className="pt-8 text-sm text-slate-500">? {new Date().getFullYear()} ChatPT Atlas</footer>
    </main>
  );
}
