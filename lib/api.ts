import axios from "axios";
import { Note } from "@/types/note";

const API_BASE = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
console.log("TOKEN:", process.env.NEXT_PUBLIC_NOTEHUB_TOKEN);
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

export interface NotesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
  totalNotes: number;
}

export async function fetchNotes(
  page: number,
  search: string
): Promise<NotesResponse> {
  const { data } = await api.get<NotesResponse>("/notes", {
    params: { page, search },
  });

  return {
    ...data,
    notes: data.notes.map((note) => ({
      ...note,
      id: String(note.id), 
    })),
  };
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get(`/notes/${id}`);
  return { ...data, id: String(data.id) };
}


export async function createNote(note: { title: string; content: string; tag: string }): Promise<Note> {
    const { data } = await api.post("/notes", note);
    return { ...data, id: String(data.id) };
  }

export async function deleteNote(id: string): Promise<void> {
  const { status } = await api.delete(`/notes/${id}`);
  if (status !== 200) {
    throw new Error("Failed to delete note");
  }
}