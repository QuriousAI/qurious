"use client";

import { useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
  QueryClient as TanStackQueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import { ConvexQueryClient } from "@convex-dev/react-query";

export function ConvexWithClerkProvider({ children }: { children: ReactNode }) {
  const convexReactClient = new ConvexReactClient(
    process.env.NEXT_PUBLIC_CONVEX_URL
  );
  const convexQueryClient = new ConvexQueryClient(convexReactClient);

  const tanStackQueryClient = new TanStackQueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
      },
    },
  });

  convexQueryClient.connect(tanStackQueryClient);

  return (
    <ConvexProviderWithClerk client={convexReactClient} useAuth={useAuth}>
      <TanStackQueryClientProvider client={tanStackQueryClient}>
        {children}
      </TanStackQueryClientProvider>
    </ConvexProviderWithClerk>
  );
}
