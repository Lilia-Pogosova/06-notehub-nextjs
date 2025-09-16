import { QueryClient } from "@tanstack/react-query";

let queryClient: QueryClient | undefined;

export default function getQueryClient() {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, 
          refetchOnWindowFocus: false,
          retry: 1,
        },
      },
    });
  }
  return queryClient;
}