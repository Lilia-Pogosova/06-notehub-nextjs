import axios from "axios";
import { Note, CreateNoteDTO } from "@/types/note";
import { SingleNoteResponse, NotesResponse } from "@/types/api";

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
        config.headers.Authorization = `Bearer ${ token }`;
    }
    return config;
});

export type NormalizedNotesResponse = NotesResponse & {
    page: number;
    totalNotes: number;
    totalPages: number;
};

export async function fetchNotes(
    page: number,
    search: string
): Promise<NormalizedNotesResponse> {
    const { data } = await api.get<NotesResponse>("/notes", {
        params: { page, search },
    });

    const PER_PAGE = 10;
    const totalNotes: number = data.totalNotes ?? data.notes.length;
    const totalPages: number =
        data.totalPages ?? Math.max(1, Math.ceil(totalNotes / PER_PAGE));
    const currentPage: number = data.page ?? page;

    return {
        ...data,
        page: currentPage,
        totalNotes,
        totalPages,
        notes: data.notes.map((note) => ({ ...note, id: String(note.id) })),
    };
}

export async function fetchNoteById(id: string): Promise<Note> {
    const { data } = await api.get<Note>(`/notes/${id}`);
  
    return {
      ...data,
      id: String(data.id),
    };
  }
export async function createNote(note: CreateNoteDTO): Promise<Note> {
    const { data } = await api.post<SingleNoteResponse>("/notes", note);
    return data.note;
}

export async function deleteNote(id: string): Promise<Note> {
    const { data } = await api.delete<SingleNoteResponse>(`/notes/${id}`);
    return data.note;
}