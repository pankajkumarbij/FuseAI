"use client";

import { Card } from "@/components/ui/card";
import { Bot, ImageIcon, Video, Music, ArrowRight } from "lucide-react";
import Link from "next/link";

const models = [
  {
    type: "chat",
    name: "Chat Models",
    icon: Bot,
    description: "Engage in conversations, get answers, and generate content",
    popular: ["GPT-4", "Claude 2", "Gemini Pro"],
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    type: "image",
    name: "Image Generation",
    icon: ImageIcon,
    description: "Create, edit, and transform images with AI",
    popular: ["DALL-E 3", "Midjourney", "Stable Diffusion"],
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    type: "video",
    name: "Video Generation",
    icon: Video,
    description: "Generate and edit videos with AI",
    popular: ["Runway Gen-2", "Pika Labs", "Stable Video"],
    color: "bg-green-500/10 text-green-500"
  },
  {
    type: "audio",
    name: "Audio Generation",
    icon: Music,
    description: "Create music, voice overs, and sound effects",
    popular: ["AudioCraft", "Elevenlabs", "Whisper"],
    color: "bg-orange-500/10 text-orange-500"
  }
];

export default function WorkspaceWelcome() {
  return (
    <div className="flex flex-col h-full p-4 md:p-6 overflow-y-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome to AI Hub</h1>
        <p className="text-muted-foreground">Choose a model to start creating</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto w-full">
        {models.map((model) => (
          <Link 
            key={model.type}
            href={`/workspace?type=${model.type}&provider=${model.popular[0].split(" ")[0]}&model=${model.popular[0]}`}
          >
            <Card className="p-4 md:p-6 hover:shadow-lg transition-all cursor-pointer group h-full">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${model.color} shrink-0`}>
                  <model.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-lg md:text-xl font-semibold truncate">{model.name}</h2>
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 shrink-0" />
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{model.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {model.popular.map((name) => (
                      <div 
                        key={name}
                        className="text-sm px-2.5 py-0.5 rounded-full bg-muted truncate"
                      >
                        {name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-auto text-center pt-8">
        <p className="text-sm text-muted-foreground">
          Need help getting started? Check out our{" "}
          <Link href="/docs" className="text-primary hover:underline">
            documentation
          </Link>
          {" "}or{" "}
          <Link href="/examples" className="text-primary hover:underline">
            example projects
          </Link>
        </p>
      </div>
    </div>
  );
}