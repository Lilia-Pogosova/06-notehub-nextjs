export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    tag?: string;
}

export interface NotesResponse {
    notes: Note[];
    page: number;
    totalPages: number;
    totalNotes: number;
}