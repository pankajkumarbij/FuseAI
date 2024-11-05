"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Music, UploadIcon, SendIcon, Settings2 } from "lucide-react";
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

interface AudioInterfaceProps {
  modelInfo: ModelInfo;
}

export default function AudioInterface({ modelInfo }: AudioInterfaceProps) {
  const [prompts, setPrompts] = useState<Array<{ input: string; output: string }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [voice, setVoice] = useState("natural");
  const [speed, setSpeed] = useState([1]);
  const [quality, setQuality] = useState("high");
  const [language, setLanguage] = useState("en-US");

  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    setPrompts(prev => [...prev, { 
      input, 
      output: "https://example.com/sample-audio.mp3"
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
                  <audio 
                    controls 
                    className="w-full max-w-xl mx-auto"
                  >
                    <source src={prompt.output} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
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
            title="Upload reference audio"
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
                <SheetTitle>Audio Settings</SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Voice</label>
                  <Select value={voice} onValueChange={setVoice}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="natural">Natural</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Speed</label>
                  <Slider
                    value={speed}
                    onValueChange={setSpeed}
                    min={0.5}
                    max={2}
                    step={0.1}
                    className="mt-3"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Quality</label>
                  <Select value={quality} onValueChange={setQuality}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="ultra">Ultra</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Language</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
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
            accept="audio/*"
          />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to convert to speech or describe the audio..."
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