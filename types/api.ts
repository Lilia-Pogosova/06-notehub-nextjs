import { Note } from "./note";

export interface SingleNoteResponse{
    note: Note;
}

export interface NotesResponse {
    notes: Note[];
    page?: number;
    totalNotes?: number;
    totalPages?: number;
}
