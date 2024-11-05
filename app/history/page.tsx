"use client";

import SharedLayout from "@/components/shared-layout";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MessageSquare, ImageIcon, Video, Music } from "lucide-react";

export default function HistoryPage() {
  const [filter, setFilter] = useState("all");

  const mockHistory = [
    {
      id: 1,
      type: "chat",
      model: "ChatGPT-4",
      content: "A conversation about AI ethics",
      date: "2024-01-20",
      tokens: 1250,
    },
    {
      id: 2,
      type: "image",
      model: "DALL-E 3",
      content: "A futuristic cityscape",
      date: "2024-01-19",
      tokens: 2000,
    },
    // Add more mock history items
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "chat":
        return <MessageSquare className="w-5 h-5" />;
      case "image":
        return <ImageIcon className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      case "audio":
        return <Music className="w-5 h-5" />;
      default:
        return <MessageSquare className="w-5 h-5" />;
    }
  };

  return (
    <SharedLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Generation History</h1>
          <div className="flex gap-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="chat">Chat</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Search history..."
              className="w-[200px]"
            />
          </div>
        </div>

        <div className="space-y-4">
          {mockHistory.map((item) => (
            <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-muted rounded-lg">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{item.content}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.model} • {item.date}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {item.tokens} tokens
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </SharedLayout>
  );
}