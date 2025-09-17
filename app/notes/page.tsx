
import NotesClient from "./Notes.client";
import { fetchNotes, NormalizedNotesResponse } from "@/lib/api";

export default async function NotesPage() {
  const initialData: NormalizedNotesResponse = await fetchNotes(1, "");

  return <NotesClient initialData={initialData} />;
}
