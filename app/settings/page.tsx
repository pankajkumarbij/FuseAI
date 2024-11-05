"use client";

import SharedLayout from "@/components/shared-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreditCard, Zap } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const usage = {
    total: 1000000,
    used: 750000,
    plan: "Pro",
    renewalDate: "2024-02-20",
  };

  const apiKeys = [
    { name: "Production Key", key: "sk-...abc", created: "2024-01-01" },
    { name: "Development Key", key: "sk-...xyz", created: "2024-01-15" },
  ];

  return (
    <SharedLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="grid gap-6">
          {/* Usage Section */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Usage & Limits</h2>
                <p className="text-muted-foreground">
                  Plan: {usage.plan} • Renews on {usage.renewalDate}
                </p>
              </div>
              <Button asChild>
                <Link href="/pricing">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Upgrade Plan
                </Link>
              </Button>
            </div>

            {/* Rest of the usage section remains the same... */}
          </Card>

          {/* Rest of the component remains the same... */}
        </div>
      </div>
    </SharedLayout>
  );
}