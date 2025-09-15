import { QueryClient } from "@tanstack/react-query";

export default function getQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,

        retry: false,
      },
    },
  });
}