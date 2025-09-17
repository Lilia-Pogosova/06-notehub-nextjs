"use client";

import { useState, useEffect } from "react";
import {
    useQuery,
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query";
import { fetchNotes, NormalizedNotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";

interface NotesClientProps {
    initialData: NormalizedNotesResponse;
    initialPage?: number;
    initialQuery?: string;
}

const queryClient = new QueryClient();

export default function NotesClient({
    initialData,
    initialPage = 1,
    initialQuery = "",
}: NotesClientProps) {
    const [page, setPage] = useState(initialPage);
    const [search, setSearch] = useState(initialQuery);
    const [debouncedSearch, setDebouncedSearch] = useState(initialQuery);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 300);
        return () => clearTimeout(handler);
    }, [search]);

    const { data, isLoading, isError } = useQuery<NormalizedNotesResponse, Error>(
        {
            queryKey: ["notes", page, debouncedSearch],
            queryFn: () => fetchNotes(page, debouncedSearch),
            placeholderData: initialData,
        }
    );

    const notes = data?.notes ?? [];
    const totalPages = data?.totalPages ?? 1;

    return (
        <QueryClientProvider client={queryClient}>
            <div className={css.app}>
                <div className={css.toolbar}>
                    <SearchBox value={search} onChange={setSearch} />
                    <button className={css.button} onClick={() => setIsOpen(true)}>
                        Create note +
                    </button>
                </div>

                {isLoading && <p>Loading...</p>}
                {isError && <p>Error loading notes</p>}

                {notes.length > 0 ? <NoteList notes={notes} /> : <p>No notes found</p>}

                {totalPages > 1 && (
                    <Pagination
                        page={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                )}

                {isOpen && (
                    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                        <NoteForm onClose={() => setIsOpen(false)} />
                    </Modal>
                )}
            </div>
        </QueryClientProvider>
    );
}
