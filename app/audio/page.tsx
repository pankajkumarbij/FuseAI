"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Music, Mic, Download, Share2, Play, Pause } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AudioPage() {
  const [prompt, setPrompt] = useState("");
  const [audios, setAudios] = useState<Array<{ url: string; prompt: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setAudios([
        {
          url: "https://example.com/audio.mp3",
          prompt: prompt
        },
        ...audios
      ]);
      setLoading(false);
      setPrompt("");
    }, 2000);
  };

  return (
    <div className="container mx-auto h-screen p-4 flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <Tabs defaultValue="bark" className="flex-1 flex flex-col">
          <div className="border-b px-4 py-2">
            <TabsList>
              <TabsTrigger value="bark" className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                Bark
              </TabsTrigger>
              <TabsTrigger value="musicgen" className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                MusicGen
              </TabsTrigger>
              <TabsTrigger value="audiocraft" className="flex items-center gap-2">
                <Mic className="w-4 h-4" />
                AudioCraft
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="bark" className="flex-1 flex flex-col mt-0">
            <div className="grid md:grid-cols-2 gap-4 p-4 flex-1">
              {/* Input Section */}
              <Card className="p-4 space-y-4">
                <form onSubmit={handleGenerate} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Audio Description</h3>
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe the audio you want to generate..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Voice Selection</h3>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a voice" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male1">Male Voice 1</SelectItem>
                          <SelectItem value="female1">Female Voice 1</SelectItem>
                          <SelectItem value="neutral">Neutral Voice</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Duration (seconds)</h3>
                      <Slider defaultValue={[10]} max={60} step={1} />
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Background Music</h3>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select background music" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="ambient">Ambient</SelectItem>
                          <SelectItem value="upbeat">Upbeat</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Generating..." : "Generate Audio"}
                  </Button>
                </form>
              </Card>

              {/* Gallery Section */}
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="grid gap-4">
                  {audios.map((audio, index) => (
                    <Card key={index} className="p-4 space-y-4">
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setPlaying(playing === index ? null : index)}
                          >
                            {playing === index ? (
                              <Pause className="w-6 h-6" />
                            ) : (
                              <Play className="w-6 h-6" />
                            )}
                          </Button>
                          <div className="flex-1 mx-4">
                            <div className="h-2 bg-primary/20 rounded-full">
                              <div className="h-2 bg-primary rounded-full" style={{ width: "30%" }} />
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">0:30</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{audio.prompt}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm" variant="outline">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}