"use client";

import { useState } from "react";
import { sendMessage } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Typewriter } from "react-simple-typewriter";

export default function ChatWindow({ agentName = "BRAVO" }: { agentName?: string }) {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(input);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: res.final || "..." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Error: no pude conectar al backend." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen p-4 bg-black text-white">
      <Card className="w-full max-w-2xl p-4 bg-zinc-900 border-zinc-700">

        {/* ---- TÍTULO BRAVO ---- */}
        <h2 className="text-2xl font-bold mb-3 text-white text-center">
          ⚡ {agentName}
        </h2>

        <div className="h-[400px] overflow-y-auto space-y-3 p-2 bg-zinc-800 rounded">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 ${
                msg.role === "user" ? "justify-end" : ""
              }`}
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback>
                  {msg.role === "user" ? "Tú" : agentName.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div
                className={`p-2 rounded max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-700 text-white"
                }`}
              >
                {msg.role === "assistant" &&
                idx === messages.length - 1 &&
                loading ? (
                  <Typewriter words={[`${agentName} está pensando...`]} loop={1} cursor />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-3 bg-zinc-600" />

        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Escribe un mensaje para ${agentName}...`}
            className="bg-zinc-800 border-zinc-600 text-white"
          />
          <Button onClick={handleSend} disabled={loading}>
            {loading ? "..." : "Enviar"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
