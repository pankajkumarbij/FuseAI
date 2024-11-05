"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Video, UploadIcon, SendIcon, Settings2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import PromptSuggestions from "@/components/prompt-suggestions";
import EmptyState from "@/components/empty-state";

interface ModelInfo {
  type: string;
  provider: string;
  model: string;
}

interface VideoInterfaceProps {
  modelInfo: ModelInfo;
}

export default function VideoInterface({ modelInfo }: VideoInterfaceProps) {
  const [prompts, setPrompts] = useState<Array<{ input: string; output: string }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resolution, setResolution] = useState("1080p");
  const [duration, setDuration] = useState([5]);
  const [fps, setFps] = useState("30");
  const [style, setStyle] = useState("cinematic");

  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    setPrompts(prev => [...prev, { 
      input, 
      output: "https://example.com/sample-video.mp4"
    }]);
    setInput("");
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto w-full px-4">
      <div className="flex-1 overflow-hidden flex flex-col">
        {prompts.length === 0 && (
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

        {prompts.length > 0 && (
          <ScrollArea className="flex-1 px-4">
            <div className="space-y-4 py-4">
              {prompts.map((prompt, index) => (
                <Card key={index} className="p-4">
                  <p className="text-sm font-medium mb-2">{prompt.input}</p>
                  <video 
                    controls 
                    className="rounded-lg w-full max-w-xl mx-auto"
                  >
                    <source src={prompt.output} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
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
            title="Upload reference video or image"
          >
            <UploadIcon className="h-4 w-4" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Settings2 className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[300px]">
              <SheetHeader>
                <SheetTitle>Video Settings</SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Resolution</label>
                  <Select value={resolution} onValueChange={setResolution}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select resolution" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="720p">720p</SelectItem>
                      <SelectItem value="1080p">1080p</SelectItem>
                      <SelectItem value="4k">4K</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Duration (seconds)</label>
                  <Slider
                    value={duration}
                    onValueChange={setDuration}
                    min={1}
                    max={30}
                    step={1}
                    className="mt-3"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">FPS</label>
                  <Select value={fps} onValueChange={setFps}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select FPS" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24">24 FPS</SelectItem>
                      <SelectItem value="30">30 FPS</SelectItem>
                      <SelectItem value="60">60 FPS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Style</label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cinematic">Cinematic</SelectItem>
                      <SelectItem value="animated">Animated</SelectItem>
                      <SelectItem value="realistic">Realistic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="video/*,image/*"
          />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe the video you want to generate..."
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