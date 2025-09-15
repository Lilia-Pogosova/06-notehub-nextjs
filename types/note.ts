export interface Note {
    id: string;
    title: string;
    content: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
  }
export interface NotesResponse {
    notes: Note[];
    page: number;
    totalPages: number;
    totalNotes: number;
}