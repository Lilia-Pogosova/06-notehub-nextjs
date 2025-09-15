"use client";

import { useState, useEffect } from "react";

interface Note {
    id: number;
    text: string;
}

export default function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [text, setText] = useState("");

    const fetchNotes = async () => {
        const res = await fetch("/api/notes");
        const data = await res.json();
        setNotes(data);
    };

    const addNote = async () => {
        if (!text.trim()) return;
        const res = await fetch("/api/notes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });
        const newNote = await res.json();
        setNotes((prev) => [...prev, newNote]);
        setText("");
    };

    const deleteNote = async (id: number) => {
        await fetch(`/api/notes?id=${id}`, { method: "DELETE" });
        setNotes((prev) => prev.filter((note) => note.id !== id));
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    return (
        <div>
            <h2>Нотатки</h2>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={addNote}>Додати</button>
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>
                        {note.text}{" "}
                        <button onClick={() => deleteNote(note.id)}>Видалити</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
