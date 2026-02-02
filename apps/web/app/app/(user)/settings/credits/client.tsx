"use client";

import { useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/design-system/components/card";
import { Badge } from "@workspace/design-system/components/badge";
import { Button } from "@workspace/design-system/components/button";
import { Skeleton } from "@workspace/design-system/components/skeleton";
import {
  Coins,
  Sparkles,
  FileText,
  MessageSquare,
  Camera,
  ExternalLink,
  AlertCircleIcon,
} from "@workspace/design-system/icons";
import Link from "next/link";

import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@workspace/design-system/components/alert";

export function CreditsClient() {
  const userData = useQuery(api.users.queries.getCurrentUser);

  if (!userData) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-12 w-48" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const creditUsage = [
    {
      feature: "Result Summary",
      credits: 2,
      icon: FileText,
      description: "Full result analysis",
    },
    {
      feature: "Study Snapshot",
      credits: 1,
      icon: Camera,
      description: "Quick snapshot of paper",
    },
    // {
    //   feature: "Ask Paper",
    //   credits: 1,
    //   icon: MessageSquare,
    //   description: "Q&A with paper",
    // },
  ];

  return (
    <div className="space-y-6">
      {/* Credits Balance Card */}
      <Card className="bg-gradient-to-br from-primary/5 via-transparent to-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Your Credits
          </CardTitle>
          <CardDescription>
            Credits are used for AI-powered features and searches.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-bold tracking-tight">
              {userData.credits}
            </span>
            <Badge variant="secondary" className="text-sm">
              credits remaining
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Credit Usage Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Credit Usage
          </CardTitle>
          <CardDescription>
            How credits are used across features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {creditUsage.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.feature}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{item.feature}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="font-mono">
                    {item.credits} {item.credits === 1 ? "credit" : "credits"}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Purchase Card */}
      <Card>
        <CardHeader>
          <CardTitle>Need More Credits?</CardTitle>
          <CardDescription>
            Purchase additional credits to continue using AI features.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button asChild>
            <Link
              href="https://test.checkout.dodopayments.com/buy/pdt_1rRVmQaYdPvh3FcrzgFJ7?quantity=1"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              Purchase Credits
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
          <Alert variant="destructive">
            {/* <AlertTitle>Note:</AlertTitle> */}
            <AlertCircleIcon className="h-4 w-4" />
            <AlertDescription>
              Enter your correct account email at checkout. Credits are applied
              to the email provided and are non-transferable.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
}
