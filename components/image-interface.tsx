"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ImageIcon, UploadIcon, SendIcon, Settings2 } from "lucide-react";
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

interface ImageInterfaceProps {
  modelInfo: ModelInfo;
}

export default function ImageInterface({ modelInfo }: ImageInterfaceProps) {
  const [prompts, setPrompts] = useState<Array<{ input: string; output: string }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSize, setImageSize] = useState("1024x1024");
  const [quality, setQuality] = useState([80]);
  const [style, setStyle] = useState("natural");

  const handleSubmit = async () => {
    if (!input.trim()) return;
    
    setPrompts(prev => [...prev, { input, output: "https://source.unsplash.com/random/512x512" }]);
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
                  <img 
                    src={prompt.output} 
                    alt={prompt.input}
                    className="rounded-lg w-full max-w-xl mx-auto"
                  />
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
            title="Upload reference image"
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
                <SheetTitle>Image Settings</SheetTitle>
              </SheetHeader>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Image Size</label>
                  <Select value={imageSize} onValueChange={setImageSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1024x1024">1024×1024</SelectItem>
                      <SelectItem value="1024x1792">1024×1792</SelectItem>
                      <SelectItem value="1792x1024">1792×1024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Quality</label>
                  <Slider
                    value={quality}
                    onValueChange={setQuality}
                    min={1}
                    max={100}
                    step={1}
                    className="mt-3"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Style</label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="natural">Natural</SelectItem>
                      <SelectItem value="vivid">Vivid</SelectItem>
                      <SelectItem value="artistic">Artistic</SelectItem>
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
            accept="image/*"
          />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe the image you want to generate..."
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