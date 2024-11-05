import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Brain, ImageIcon, Video, Music, Sparkles, MessageSquare, History, Zap, ArrowRight, Check, Bot, Wand2, Code } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-2">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">AI Hub</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button asChild variant="outline" size="sm">
              <Link href="/workspace">Sign In</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/workspace">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 bg-muted px-4 py-1.5 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">All your favorite AI models in one place</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
              Your Ultimate AI Creation Hub
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Access ChatGPT, DALL-E, Midjourney, Claude, and more through a single, powerful platform. Create anything with AI - from text to images, videos, and audio.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="rounded-full">
                <Link href="/workspace">
                  Start Creating
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <Link href="/pricing">View Plans</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Models Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Supported Models</h2>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Access the world's most powerful AI models through a single, unified interface
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ModelCard
                icon={<Bot className="w-12 h-12 text-blue-500" />}
                title="ChatGPT & Claude"
                models={["GPT-4", "GPT-3.5", "Claude 3", "Gemini Pro"]}
              />
              <ModelCard
                icon={<Wand2 className="w-12 h-12 text-purple-500" />}
                title="Image Generation"
                models={["DALL-E 3", "Midjourney V6", "Stable Diffusion XL"]}
              />
              <ModelCard
                icon={<Video className="w-12 h-12 text-green-500" />}
                title="Video Creation"
                models={["Runway Gen-2", "Pika Labs", "ModelScope"]}
              />
              <ModelCard
                icon={<Music className="w-12 h-12 text-red-500" />}
                title="Audio Generation"
                models={["Bark", "AudioCraft", "MusicGen"]}
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4">Why Choose AI Hub?</h2>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Everything you need to create with AI, all in one place
            </p>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <FeatureCard
                icon={<Code className="w-8 h-8 text-primary" />}
                title="Single API Access"
                description="One API key to access all AI models. No need to manage multiple provider accounts and keys."
              />
              <FeatureCard
                icon={<History className="w-8 h-8 text-blue-500" />}
                title="Version Control"
                description="Track and manage all your AI generations. Compare versions and iterate on your creations."
              />
              <FeatureCard
                icon={<Zap className="w-8 h-8 text-yellow-500" />}
                title="Cost Management"
                description="Monitor usage across all models. Set budgets and get alerts when approaching limits."
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <StatCard number="20+" label="AI Models" />
              <StatCard number="100k+" label="Daily Generations" />
              <StatCard number="99.9%" label="Uptime" />
              <StatCard number="24/7" label="Support" />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Creating?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of creators and businesses using AI Hub to power their projects
            </p>
            <Button asChild size="lg" variant="secondary" className="rounded-full">
              <Link href="/workspace">
                Get Started for Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary p-2">
                <MessageSquare className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold">AI Hub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 AI Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ModelCard({ icon, title, models }: {
  icon: React.ReactNode;
  title: string;
  models: string[];
}) {
  return (
    <Card className="p-6 hover:shadow-lg transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {models.map((model) => (
          <li key={model} className="flex items-center gap-2 text-muted-foreground">
            <Check className="w-4 h-4 text-primary" />
            {model}
          </li>
        ))}
      </ul>
    </Card>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center space-y-4">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="space-y-2">
      <div className="text-4xl font-bold text-primary">{number}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
}