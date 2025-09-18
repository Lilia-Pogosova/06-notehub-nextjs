import { Note } from "./note";

export type SingleNoteResponse = {note:Note};


export interface NotesResponse {
    notes: Note[];
    page?: number;
    totalNotes?: number;
    totalPages?: number;
}
