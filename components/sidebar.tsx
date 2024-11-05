"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Bot, ChevronDown, ChevronLeft, ChevronRight, CreditCard, History, Settings, Sparkles, Video, Music } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const categories = [
  {
    type: "chat",
    name: "Chat",
    icon: Bot,
    providers: [
      {
        name: "OpenAI",
        models: ["GPT-4", "GPT-3.5"]
      },
      {
        name: "Anthropic",
        models: ["Claude 2", "Claude Instant"]
      },
      {
        name: "Google",
        models: ["Gemini Pro", "Gemini Ultra"]
      }
    ]
  },
  {
    type: "image",
    name: "Image Generation",
    icon: Sparkles,
    providers: [
      {
        name: "OpenAI",
        models: ["DALL-E 3", "DALL-E 2"]
      },
      {
        name: "Midjourney",
        models: ["V6", "V5"]
      },
      {
        name: "Stable Diffusion",
        models: ["SDXL", "SD 1.5"]
      }
    ]
  },
  {
    type: "video",
    name: "Video Generation",
    icon: Video,
    providers: [
      {
        name: "Runway",
        models: ["Gen-2", "Gen-1"]
      },
      {
        name: "Pika Labs",
        models: ["v1", "Beta"]
      },
      {
        name: "Stable Video",
        models: ["SVD", "SVD-XT"]
      }
    ]
  },
  {
    type: "audio",
    name: "Audio Generation",
    icon: Music,
    providers: [
      {
        name: "OpenAI",
        models: ["TTS", "Whisper"]
      },
      {
        name: "Elevenlabs",
        models: ["Premium", "Standard"]
      },
      {
        name: "AudioCraft",
        models: ["MusicGen", "AudioGen"]
      }
    ]
  }
];

const recentHistory = [
  { type: "chat", title: "Marketing Strategy", model: "GPT-4", time: "2h ago" },
  { type: "image", title: "Product Mockup", model: "DALL-E 3", time: "3h ago" },
  { type: "chat", title: "Code Review", model: "GPT-4", time: "5h ago" },
  { type: "video", title: "Promo Video", model: "Runway", time: "1d ago" },
  { type: "audio", title: "Podcast Edit", model: "Whisper", time: "1d ago" }
];

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type") || "";
  const currentProvider = searchParams.get("provider") || "";
  const currentModel = searchParams.get("model") || "";

  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const toggleCategory = (type: string) => {
    setExpandedCategories(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "chat":
        return <Bot className="h-4 w-4 text-muted-foreground" />;
      case "image":
        return <Sparkles className="h-4 w-4 text-muted-foreground" />;
      case "video":
        return <Video className="h-4 w-4 text-muted-foreground" />;
      case "audio":
        return <Music className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Bot className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const showExpanded = !isCollapsed || isHovered;

  return (
    <div 
      className={cn(
        "fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-card border-r transition-all duration-300 z-30",
        showExpanded ? "w-64" : "w-16"
      )}
      onMouseEnter={() => isCollapsed && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant="outline"
        size="sm"
        className={cn(
          "absolute -right-4 top-3 h-8 w-8 rounded-full border shadow-md bg-background p-0 hover:bg-background z-50",
          !showExpanded && "rotate-180"
        )}
        onClick={() => {
          setIsHovered(false);
          onToggle();
        }}
      >
        {!showExpanded ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      <div className="flex flex-col h-full">
        {/* Top Section - Categories */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {!showExpanded ? (
              <div className="flex flex-col items-center space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.type}
                    href={`/workspace?type=${category.type}&provider=${category.providers[0].name}&model=${category.providers[0].models[0]}`}
                  >
                    <Button
                      variant={currentType === category.type ? "secondary" : "ghost"}
                      size="icon"
                      className="w-10 h-10"
                    >
                      <category.icon className="h-5 w-5" />
                    </Button>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {categories.map((category) => (
                  <Collapsible
                    key={category.type}
                    open={expandedCategories.includes(category.type)}
                    className="space-y-1"
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between h-9 px-2 hover:bg-transparent"
                        onClick={() => toggleCategory(category.type)}
                      >
                        <div className="flex items-center">
                          <category.icon className="h-4 w-4 shrink-0" />
                          <span className="ml-2">{category.name}</span>
                        </div>
                        <ChevronDown className={cn(
                          "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                          expandedCategories.includes(category.type) && "rotate-180"
                        )} />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1">
                      {category.providers.map((provider) => (
                        <div key={provider.name} className="pl-4 space-y-1">
                          <div className="flex items-center gap-2 px-2 py-1">
                            <category.icon className="w-3 h-3 text-muted-foreground" />
                            <h3 className="text-sm font-medium text-muted-foreground">
                              {provider.name}
                            </h3>
                          </div>
                          {provider.models.map((model) => (
                            <Link
                              key={model}
                              href={`/workspace?type=${category.type}&provider=${provider.name}&model=${model}`}
                            >
                              <Button
                                variant={
                                  currentType === category.type &&
                                  currentProvider === provider.name &&
                                  currentModel === model
                                    ? "secondary"
                                    : "ghost"
                                }
                                className="w-full justify-start pl-6 h-8 text-sm"
                              >
                                <category.icon className="w-3 h-3 mr-2 text-muted-foreground" />
                                {model}
                              </Button>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Bottom Section - History and Navigation */}
        <div className="border-t">
          {showExpanded && (
            <div className="p-2">
              <div className="flex items-center justify-between mb-2 px-2">
                <h2 className="text-sm font-semibold">Recent Activity</h2>
                <Button variant="ghost" size="sm" asChild className="h-7 px-2">
                  <Link href="/history">
                    <History className="h-4 w-4 mr-2" />
                    View All
                  </Link>
                </Button>
              </div>
              <div className="h-[100px] overflow-y-auto">
                {recentHistory.slice(0, 3).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 py-1.5 px-2 hover:bg-muted/50 rounded-lg cursor-pointer"
                  >
                    <div className="mt-0.5">{getIcon(item.type)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.model} • {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={cn(
            "border-t border-dashed bg-muted/50 p-2",
            !showExpanded ? "flex flex-col items-center space-y-2" : "space-y-1"
          )}>
            {!showExpanded ? (
              <>
                <Link href="/history" className="p-2 hover:bg-muted rounded-lg">
                  <History className="h-5 w-5" />
                </Link>
                <Link href="/pricing" className="p-2 hover:bg-muted rounded-lg">
                  <CreditCard className="h-5 w-5" />
                </Link>
                <Link href="/settings" className="p-2 hover:bg-muted rounded-lg">
                  <Settings className="h-5 w-5" />
                </Link>
              </>
            ) : (
              <>
                <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                  <Link href="/history">
                    <History className="h-4 w-4" />
                    History
                  </Link>
                </Button>
                <Button variant="default" className="w-full justify-start gap-2" asChild>
                  <Link href="/pricing">
                    <CreditCard className="h-4 w-4" />
                    Upgrade Plan
                  </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                  <Link href="/settings">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}