"use client";

import { Bot, ImageIcon, Video, Music } from "lucide-react";

interface EmptyStateProps {
  type: string;
  provider: string;
  model: string;
}

export default function EmptyState({ type, provider, model }: EmptyStateProps) {
  const getIcon = () => {
    switch (type) {
      case "chat":
        return <Bot className="w-12 h-12 text-muted-foreground" />;
      case "image":
        return <ImageIcon className="w-12 h-12 text-muted-foreground" />;
      case "video":
        return <Video className="w-12 h-12 text-muted-foreground" />;
      case "audio":
        return <Music className="w-12 h-12 text-muted-foreground" />;
      default:
        return <Bot className="w-12 h-12 text-muted-foreground" />;
    }
  };

  const getMessage = () => {
    switch (type) {
      case "chat":
        return "Start a conversation with AI";
      case "image":
        return "Create stunning images with AI";
      case "video":
        return "Generate amazing videos with AI";
      case "audio":
        return "Create audio content with AI";
      default:
        return "Start creating with AI";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 text-center flex-1">
      <div className="bg-muted/50 p-4 rounded-full mb-4">
        {getIcon()}
      </div>
      <h2 className="text-xl font-semibold mb-2">
        {provider} - {model}
      </h2>
      <p className="text-muted-foreground mb-4">{getMessage()}</p>
      <p className="text-sm text-muted-foreground max-w-md">
        Choose a suggestion below or start with your own prompt
      </p>
    </div>
  );
}