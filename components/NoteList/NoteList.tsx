"use client";

import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Note } from "@/types/note";
import { deleteNote } from "@/lib/api";
import css from "./NoteList.module.css";

interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string ) => deleteNote(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notes"] }),
    });

    const handleDelete = (id: string ) => {
        if (confirm("Are you sure you want to delete this note?")) {
            mutation.mutate(id);
        }
    };

    return (
        <div className={css.list}>
            {notes.map((note) => (
                <div key={note.id} className={css.listItem}>
                    <h3 className={css.title}>{note.title}</h3>
                    <p className={css.content}>{note.content}</p>
                    <div className={css.footer}>
                        <Link href={`/notes/${note.id}`} className={css.link}>
                            View Details
                        </Link>
                        <button
                            onClick={() => handleDelete(note.id)}
                            className={css.button}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
