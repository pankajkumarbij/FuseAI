"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { ImageIcon, Wand2, Download, Share2 } from "lucide-react";
import Image from "next/image";

export default function ImagePage() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState<Array<{ url: string; prompt: string }>>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setImages([
        {
          url: "https://images.unsplash.com/photo-1655635643532-fa9ba2648cbe",
          prompt: prompt
        },
        ...images
      ]);
      setLoading(false);
      setPrompt("");
    }, 2000);
  };

  return (
    <div className="container mx-auto h-screen p-4 flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
        <Tabs defaultValue="dalle" className="flex-1 flex flex-col">
          <div className="border-b px-4 py-2">
            <TabsList>
              <TabsTrigger value="dalle" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                DALL-E 3
              </TabsTrigger>
              <TabsTrigger value="midjourney" className="flex items-center gap-2">
                <Wand2 className="w-4 h-4" />
                Midjourney
              </TabsTrigger>
              <TabsTrigger value="stable" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Stable Diffusion
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="dalle" className="flex-1 flex flex-col mt-0">
            <div className="grid md:grid-cols-2 gap-4 p-4 flex-1">
              {/* Input Section */}
              <Card className="p-4 space-y-4">
                <form onSubmit={handleGenerate} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Image Prompt</h3>
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe the image you want to generate..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Image Size</h3>
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="1024">1024×1024</TabsTrigger>
                      <TabsTrigger value="768">768×768</TabsTrigger>
                      <TabsTrigger value="512">512×512</TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Quality</h3>
                    <Slider defaultValue={[75]} max={100} step={1} />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Generating..." : "Generate Image"}
                  </Button>
                </form>
              </Card>

              {/* Gallery Section */}
              <ScrollArea className="h-[calc(100vh-12rem)]">
                <div className="grid gap-4">
                  {images.map((image, index) => (
                    <Card key={index} className="p-4 space-y-4">
                      <div className="relative aspect-square">
                        <Image
                          src={image.url}
                          alt={image.prompt}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">{image.prompt}</p>
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