"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { Note } from "@/types/note";
import css from "./NoteForm.module.css";

interface NoteFormProps {
    onClose: () => void;
    onSuccess: () => void;
}

export default function NoteForm({ onClose, onSuccess }: NoteFormProps) {
    const queryClient = useQueryClient();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tag, setTag] = useState("");

    const mutation = useMutation<
        Note,
        Error,
        { title: string; content: string; tag: string }
    >({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            onSuccess();
            onClose();
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert("Title and Content are required!");
            return;
        }

        mutation.mutate({ title, content, tag: tag.trim() || "default" });
    };

    return (
        <form onSubmit={handleSubmit} className={css.form}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={css.input}
                required
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={css.textarea}
                required
            />
            <input
                type="text"
                placeholder="Tag (optional)"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className={css.input}
            />
            <button type="submit" className={css.button}>
                Create
            </button>
        </form>
    );
}
