"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotes, NotesResponse } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { useDebounce } from "use-debounce";
import ReactPaginate from "react-paginate";

import css from "./NotesPage.module.css";
import paginationCss from "@/components/Pagination/Pagination.module.css";

export default function NotesClient() {
    const queryClient = useQueryClient();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 500);

    const { data, isLoading, isError, error } = useQuery<NotesResponse, Error>({
        queryKey: ["notes", page, debouncedSearch],
        queryFn: () => fetchNotes(page, debouncedSearch),
    });

    const notes = data?.notes ?? [];

    const handlePageChange = (selectedItem: { selected: number }) => {
        setPage(selectedItem.selected + 1);
    };

    return (
        <div className={css.container}>
            <div className={css.toolbar}>
                <input
                    type="text"
                    placeholder="Search notes"
                    className={css.input}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className={css.button} onClick={() => setIsModalOpen(true)}>
                    Create note +
                </button>
            </div>

            {isLoading && <Loader />}
            {isError && (
                <ErrorMessage message={error?.message || "Something went wrong."} />
            )}

            {!isLoading && !isError && notes.length === 0 && <p>No notes found.</p>}

            {notes.length > 0 && <NoteList notes={notes} />}

            {data?.totalPages && data.totalPages > 1 && (
                <ReactPaginate
                    pageCount={data.totalPages}
                    onPageChange={handlePageChange}
                    containerClassName={paginationCss.pagination}
                    activeClassName={paginationCss.active}
                    previousLabel="<"
                    nextLabel=">"
                />
            )}

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <NoteForm
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={async () =>
                        queryClient.invalidateQueries({ queryKey: ["notes"] })
                    }
                />
            </Modal>
        </div>
    );
}
