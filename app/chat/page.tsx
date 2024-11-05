"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot } from "lucide-react";

const modelInfo = {
  gpt4: {
    name: "ChatGPT-4",
    description: "Most capable GPT model for complex tasks",
    contextLength: "32k tokens",
  },
  gpt3: {
    name: "ChatGPT-3.5",
    description: "Fast and efficient for most tasks",
    contextLength: "16k tokens",
  },
  claude: {
    name: "Claude 3",
    description: "Advanced reasoning and analysis",
    contextLength: "100k tokens",
  },
  gemini: {
    name: "Gemini Pro",
    description: "Google's most capable model",
    contextLength: "32k tokens",
  },
};

export default function ChatPage() {
  const searchParams = useSearchParams();
  const currentModel = searchParams.get("model") || "gpt4";
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);
    
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `This is a simulated response from ${modelInfo[currentModel as keyof typeof modelInfo].name}.`,
        },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      {/* Model Info Header */}
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">
          {modelInfo[currentModel as keyof typeof modelInfo].name}
        </h2>
        <p className="text-sm text-muted-foreground">
          {modelInfo[currentModel as keyof typeof modelInfo].description} •{" "}
          {modelInfo[currentModel as keyof typeof modelInfo].contextLength}
        </p>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </ScrollArea>

        <div className="border-t p-4">
          <form onSubmit={handleSend} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${modelInfo[currentModel as keyof typeof modelInfo].name}...`}
              className="flex-1"
            />
            <Button type="submit">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}