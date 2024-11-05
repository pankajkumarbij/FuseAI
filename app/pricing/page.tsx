"use client";

import SharedLayout from "@/components/shared-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$9",
    description: "Perfect for trying out our services",
    features: [
      "1,000 Chat tokens/month",
      "10 Image generations/month",
      "5 Video generations/month",
      "5 Audio generations/month",
      "Basic support",
    ],
  },
  {
    name: "Pro",
    price: "$29",
    description: "Best for professionals and small teams",
    features: [
      "10,000 Chat tokens/month",
      "50 Image generations/month",
      "25 Video generations/month",
      "25 Audio generations/month",
      "Priority support",
      "API access",
      "Team collaboration",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with custom needs",
    features: [
      "Unlimited Chat tokens",
      "Unlimited Image generations",
      "Unlimited Video generations",
      "Unlimited Audio generations",
      "24/7 Premium support",
      "Custom API integration",
      "Advanced analytics",
      "Custom model fine-tuning",
    ],
  },
];

export default function PricingPage() {
  return (
    <SharedLayout>
      <div className="container mx-auto py-16 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your AI generation needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-8 relative ${
                plan.popular
                  ? "border-primary shadow-lg scale-105"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-muted-foreground">/month</span>
                  )}
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </SharedLayout>
  );
}