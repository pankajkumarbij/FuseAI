"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, ImageIcon, Video, Music, ChevronLeft, ChevronRight } from "lucide-react";

interface PromptSuggestion {
  icon: React.ReactNode;
  title: string;
  prompt: string;
}

interface PromptSuggestionsProps {
  type: string;
  onSelectPrompt: (prompt: string) => void;
}

const suggestionsByType: Record<string, PromptSuggestion[]> = {
  chat: [
    {
      icon: <Bot className="w-4 h-4" />,
      title: "Write a Blog Post",
      prompt: "Write a detailed blog post about the future of AI technology"
    },
    {
      icon: <Bot className="w-4 h-4" />,
      title: "Code Review",
      prompt: "Review this React component for best practices and performance improvements"
    },
    {
      icon: <Bot className="w-4 h-4" />,
      title: "Marketing Copy",
      prompt: "Generate engaging marketing copy for a new smartphone"
    },
    {
      icon: <Bot className="w-4 h-4" />,
      title: "Data Analysis",
      prompt: "Analyze this dataset and provide insights about customer behavior"
    }
  ],
  image: [
    {
      icon: <ImageIcon className="w-4 h-4" />,
      title: "Product Showcase",
      prompt: "A professional product photo of a sleek smartphone on a minimalist background"
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      title: "Nature Scene",
      prompt: "A breathtaking landscape of mountains at sunset with dramatic lighting"
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      title: "Character Design",
      prompt: "A detailed character design for a futuristic cyberpunk warrior"
    },
    {
      icon: <ImageIcon className="w-4 h-4" />,
      title: "Food Photography",
      prompt: "A mouthwatering close-up of a gourmet burger with perfect lighting"
    }
  ],
  video: [
    {
      icon: <Video className="w-4 h-4" />,
      title: "Product Demo",
      prompt: "A smooth 360-degree rotation of a modern smartphone"
    },
    {
      icon: <Video className="w-4 h-4" />,
      title: "Nature Animation",
      prompt: "A serene forest scene with gentle leaves falling"
    },
    {
      icon: <Video className="w-4 h-4" />,
      title: "Logo Animation",
      prompt: "A modern logo reveal animation with particle effects"
    },
    {
      icon: <Video className="w-4 h-4" />,
      title: "Product Showcase",
      prompt: "A cinematic product showcase with dynamic camera movements"
    }
  ],
  audio: [
    {
      icon: <Music className="w-4 h-4" />,
      title: "Podcast Intro",
      prompt: "Create an upbeat podcast intro music with modern beats"
    },
    {
      icon: <Music className="w-4 h-4" />,
      title: "Ambient Sound",
      prompt: "Generate calming nature sounds with birds and flowing water"
    },
    {
      icon: <Music className="w-4 h-4" />,
      title: "Voice Over",
      prompt: "A professional male voice reading a product introduction"
    },
    {
      icon: <Music className="w-4 h-4" />,
      title: "Background Music",
      prompt: "Gentle background music for a meditation app"
    }
  ]
};

export default function PromptSuggestions({ type, onSelectPrompt }: PromptSuggestionsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const showLeftArrow = scrollLeft > 0;
      const showRightArrow = scrollLeft < scrollWidth - clientWidth - 10;

      // Update arrow visibility
      const leftArrow = document.getElementById('scroll-left-arrow');
      const rightArrow = document.getElementById('scroll-right-arrow');
      if (leftArrow) leftArrow.style.display = showLeftArrow ? 'block' : 'none';
      if (rightArrow) rightArrow.style.display = showRightArrow ? 'block' : 'none';
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial state
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const suggestions = suggestionsByType[type] || suggestionsByType.chat;

  return (
    <div className="relative px-4 py-6 max-w-full">
      <Button
        id="scroll-left-arrow"
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm hidden"
        onClick={() => scroll('left')}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        id="scroll-right-arrow"
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm"
        onClick={() => scroll('right')}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {suggestions.map((suggestion, index) => (
          <Card
            key={index}
            className="p-4 cursor-pointer hover:bg-muted/50 transition-colors flex-shrink-0"
            style={{ width: '250px' }}
            onClick={() => onSelectPrompt(suggestion.prompt)}
          >
            <div className="flex items-center gap-2 mb-2">
              {suggestion.icon}
              <h3 className="font-medium">{suggestion.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {suggestion.prompt}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}