"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import { Note } from "@/types/note";

interface NoteDetailsClientProps {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery<Note, Error>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <p>Loading note...</p>;
  if (isError || !note) return <p>Error loading note: {error?.message}</p>;

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <small>Created at: {new Date(note.createdAt).toLocaleString()}</small>
    </div>
  );
}
