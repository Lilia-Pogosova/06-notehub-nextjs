"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, NotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import css from "./NotesPage.module.css";

export default function NotesClient({
    initialPage = 1,
    initialQuery = "",
}: {
    initialPage?: number;
    initialQuery?: string;
}) {
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState(initialPage);
    const [search, setSearch] = useState(initialQuery);

    const { data, isLoading, isError } = useQuery<NotesResponse, Error>({
        queryKey: ["notes", page, search],
        queryFn: () => fetchNotes(page, search),
        placeholderData: (prev) => prev,
    });

    return (
        <div className={css.app}>
            <div className={css.toolbar}>
                <input
                    className={css.input}
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className={css.button} onClick={() => setIsOpen(true)}>
                    Create note +
                </button>
            </div>

            {isLoading && <p>Loading...</p>}
            {isError && <p>Error loading notes</p>}

            {data && data.notes && <NoteList notes={data.notes} />}

            {data && (
                <Pagination
                    page={page}
                    totalPages={data.totalPages}
                    onPageChange={(newPage) => setPage(newPage)}
                />
            )}


            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <NoteForm
                    onClose={() => setIsOpen(false)}
                    onSuccess={() => {
                        queryClient.invalidateQueries({ queryKey: ["notes"] });
                        setIsOpen(false);
                    }}
                />
            </Modal>
        </div>
    );
}
