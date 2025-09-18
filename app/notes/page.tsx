import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@/components/HydrationBoundary";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes(1, ""),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient />
    </HydrationBoundary>
  );
}
