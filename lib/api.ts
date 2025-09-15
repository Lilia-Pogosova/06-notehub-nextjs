import axios from "axios";
import { Note } from "@/types/note";

const API_BASE = "https://notehub-public.goit.study/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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

export async function createNote(note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> {
    const payload = {
        title: note.title,
        content: note.content,
        tags: note.tag ? [note.tag] : [],
    };
  const { data } = await api.post("/notes", payload);
  return { ...data, id: String(data.id) };
}

export async function deleteNote(id: string): Promise<void> {
  await api.delete(`/notes/${id}`);
}