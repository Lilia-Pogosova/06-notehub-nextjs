import getQueryClient from "@/lib/getQueryClient";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  searchParams?: { page?: string; query?: string };
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const page = Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", page, query],
    queryFn: () => fetchNotes(page, query),
  });

  return <NotesClient initialPage={page} initialQuery={query} />;
}
