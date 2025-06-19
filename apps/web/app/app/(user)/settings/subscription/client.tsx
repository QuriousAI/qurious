"use client";

import { useQuery } from "convex/react";
import { api } from "@workspace/backend/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/src/components/card";
import { Badge } from "@workspace/ui/src/components/badge";

export function SubscriptionClient() {
  const userData = useQuery(api.users.queries.getCurrentUser);

  if (!userData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Credits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{userData.credits}</span>
            <Badge variant="secondary">remaining</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Credits are used for AI-powered features and searches.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Credits Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Paper Summary:</span>
              <span className="text-muted-foreground">2 credits</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Study Snapshot:</span>
              <span className="text-muted-foreground">1 credit</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Ask Paper:</span>
              <span className="text-muted-foreground">1 credit</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Buy More Credits</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Need more credits to continue using our AI features? Purchase
            additional credits below.
          </p>
          <button className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Purchase Credits
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
