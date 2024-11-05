"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import ChatInterface from "@/components/chat-interface";
import ImageInterface from "@/components/image-interface";
import VideoInterface from "@/components/video-interface";
import AudioInterface from "@/components/audio-interface";
import WorkspaceWelcome from "@/components/workspace-welcome";
import Sidebar from "@/components/sidebar";
import { cn } from "@/lib/utils";

export default function WorkspacePage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const searchParams = useSearchParams();
  
  const type = searchParams.get("type");
  const provider = searchParams.get("provider") || "";
  const model = searchParams.get("model") || "";

  const modelInfo = {
    type: type || "",
    provider,
    model
  };

  const renderInterface = () => {
    if (!type) {
      return <WorkspaceWelcome />;
    }

    switch (type) {
      case "chat":
        return <ChatInterface modelInfo={modelInfo} />;
      case "image":
        return <ImageInterface modelInfo={modelInfo} />;
      case "video":
        return <VideoInterface modelInfo={modelInfo} />;
      case "audio":
        return <AudioInterface modelInfo={modelInfo} />;
      default:
        return <WorkspaceWelcome />;
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <main 
        className={cn(
          "flex-1 overflow-hidden transition-all duration-300",
          isSidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
        {renderInterface()}
      </main>
    </div>
  );
}