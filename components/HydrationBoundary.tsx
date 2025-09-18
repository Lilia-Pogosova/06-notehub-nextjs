"use client";

import { ReactNode, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  hydrate,
} from "@tanstack/react-query";

interface HydrationBoundaryProps {
  state: unknown;
  children: ReactNode;
}

export function HydrationBoundary({ state, children }: HydrationBoundaryProps) {
  const [queryClient] = useState(() => new QueryClient());

  hydrate(queryClient, state);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
