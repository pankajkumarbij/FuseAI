"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { MessageSquare, UploadIcon, SendIcon } from "lucide-react";
import PromptSuggestions from "@/components/prompt-suggestions";
import EmptyState from "@/components/empty-state";

interface ModelInfo {
  type: string;
  provider: string;
  model: string;
}

interface ChatInterfaceProps {
  modelInfo: ModelInfo;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatInterface({ modelInfo }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      role: "user",
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content: "This is a simulated response. In production, this would be replaced with actual AI model response."
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full px-4">
      <div className="flex-1 overflow-hidden flex flex-col">
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col">
            <EmptyState {...modelInfo} />
            <div className="mt-auto">
              <PromptSuggestions 
                type={modelInfo.type} 
                onSelectPrompt={(prompt) => setInput(prompt)} 
              />
            </div>
          </div>
        )}

        {messages.length > 0 && (
          <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
            <div className="space-y-4 py-4">
              {messages.map((message, index) => (
                <Card 
                  key={index} 
                  className={`p-4 ${
                    message.role === "assistant" 
                      ? "bg-secondary" 
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>

      <div className="py-4 border-t">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadIcon className="h-4 w-4" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="*/*"
          />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className="shrink-0"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}