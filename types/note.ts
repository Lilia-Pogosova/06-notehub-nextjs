export interface Note {
    id: string;
    title: string;
    content: string;
    tag: string;
    createdAt: string;
    updatedAt: string;
  }
export interface NotesResponse {
    notes: Note[];
    page: number;
    totalPages: number;
    totalNotes: number;
}