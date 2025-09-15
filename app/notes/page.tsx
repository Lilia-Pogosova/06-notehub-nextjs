import getQueryClient from "@/lib/getQueryClient";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesPageProps {
  searchParams: Promise<{ page?: string; query?: string }>;
}

export default async function NotesPage({ searchParams }: NotesPageProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const query = params?.query || "";

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", page, query],
    queryFn: () => fetchNotes(page, query),
  });

  return <NotesClient />;
}
