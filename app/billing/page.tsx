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
import { CreditCard, Download } from "lucide-react";
import Link from "next/link";

export default function BillingPage() {
  const currentPlan = {
    name: "Pro",
    price: "$29/month",
    renewalDate: "Feb 20, 2024",
    status: "Active",
  };

  const usage = {
    chat: { used: 7500, total: 10000 },
    image: { used: 35, total: 50 },
    video: { used: 15, total: 25 },
    audio: { used: 10, total: 25 },
  };

  const invoices = [
    { id: "INV-001", date: "Jan 1, 2024", amount: "$29.00", status: "Paid" },
    { id: "INV-002", date: "Dec 1, 2023", amount: "$29.00", status: "Paid" },
  ];

  return (
    <SharedLayout>
      <div className="container mx-auto p-6 max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">Billing & Usage</h1>

        <div className="grid gap-6">
          {/* Current Plan */}
          <Card className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-1">Current Plan</h2>
                <p className="text-muted-foreground">
                  {currentPlan.name} • {currentPlan.price}
                </p>
                <p className="text-sm text-muted-foreground">
                  Renews on {currentPlan.renewalDate}
                </p>
              </div>
              <div className="space-x-2">
                <Button variant="outline" asChild>
                  <Link href="/pricing">Change Plan</Link>
                </Button>
                <Button variant="default">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Update Payment
                </Button>
              </div>
            </div>

            {/* Rest of the component remains the same... */}
          </Card>

          {/* Rest of the component remains the same... */}
        </div>
      </div>
    </SharedLayout>
  );
}