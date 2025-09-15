"use client";

import css from "./Pagination.module.css";

export interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    page,
    totalPages,
    onPageChange,
}: PaginationProps) {
    return (
        <div className={css.pagination}>
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className={css.pageButton}
            >
                Prev
            </button>

            <span className={css.pageInfo}>
                Page {page} of {totalPages}
            </span>

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className={css.pageButton}
            >
                Next
            </button>
        </div>
    );
}
