"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Video, Wand2, Download, Share2, Upload } from "lucide-react";
import Image from "next/image";

export default function VideoPage() {
  const [prompt, setPrompt] = useState("");
  const [videos, setVideos] = useState<Array<{ url: string; prompt: string }>>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setVideos([
        {
          url: "https://example.com/video.mp4",
          prompt: prompt
        },
        ...videos
      ]);
      setLoading(false);
      setPrompt("");
    }, 2000);
  };

  return (
    <div className="container mx-auto h-screen p-4 flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <Tabs defaultValue="gen2" className="flex-1 flex flex-col">
          <div className="border-b px-4 py-2">
            <TabsList>
              <TabsTrigger value="gen2" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Gen-2
              </TabsTrigger>
              <TabsTrigger value="runway" className="flex items-center gap-2">
                <Wand2 className="w-4 h-4" />
                Runway
              </TabsTrigger>
              <TabsTrigger value="pika" className="flex items-center gap-2">
                <Video className="w-4 h-4" />
                Pika Labs
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="gen2" className="flex-1 flex flex-col mt-0">
            <div className="grid md:grid-cols-2 gap-4 p-4 flex-1">
              {/* Input Section */}
              <Card className="p-4 space-y-4">
                <form onSubmit={handleGenerate} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Video Description</h3>
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe the video you want to generate..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Duration (seconds)</h3>
                      <Slider defaultValue={[5]} max={30} step={1} />
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Quality</h3>
                      <TabsList className="grid grid-cols-3 w-full">
                        <TabsTrigger value="high">High</TabsTrigger>
                        <TabsTrigger value="medium">Medium</TabsTrigger>
                        <TabsTrigger value="low">Low</TabsTrigger>
                      </TabsList>
                    </div>

                    <div className="border-2 border-dashed rounded-lg p-4 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop a reference image or click to upload
                      </p>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Generating..." : "Generate Video"}
                  </Button>
                </form>
              </Card>

              {/* Gallery Section */}
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="grid gap-4">
                  {videos.map((video, index) => (
                    <Card key={index} className="p-4 space-y-4">
                      <div className="relative aspect-video bg-muted rounded-lg">
                        <video
                          src={video.url}
                          controls
                          className="w-full h-full rounded-lg"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{video.prompt}</p>
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