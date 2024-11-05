"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@/components/user-button";
import { MessageSquare, Zap, Bell } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const usage = {
    used: 7500,
    total: 10000,
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4 gap-4">
        <Link href="/workspace" className="flex items-center gap-2">
          <div className="rounded-lg bg-primary p-2">
            <MessageSquare className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl hidden md:inline-block">AI Hub</span>
        </Link>

        <div className="flex-1" />

        <div className="flex items-center gap-4">
          {/* Token Usage */}
          <div className="hidden md:flex items-center gap-3 bg-muted/50 px-3 py-1.5 rounded-full">
            <Zap className="w-4 h-4 text-yellow-500" />
            <div className="w-32">
              <div className="flex justify-between text-xs mb-1">
                <span>Credits</span>
                <span>{Math.round((usage.used / usage.total) * 100)}%</span>
              </div>
              <Progress value={(usage.used / usage.total) * 100} className="h-1.5" />
            </div>
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">New Features Available</span>
                  <span className="text-sm text-muted-foreground">
                    Try out our new video generation models
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col">
                  <span className="font-medium">Credit Usage Alert</span>
                  <span className="text-sm text-muted-foreground">
                    You've used 75% of your monthly credits
                  </span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}