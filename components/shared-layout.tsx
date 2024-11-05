"use client";

import Navbar from "@/components/navbar";

interface SharedLayoutProps {
  children: React.ReactNode;
}

export default function SharedLayout({ children }: SharedLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}