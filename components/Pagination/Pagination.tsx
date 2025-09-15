"use client";

import React from "react";
import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
    pageCount: number;
    onPageChange: (selected: number) => void;
}

export default function Pagination({
    pageCount,
    onPageChange,
}: PaginationProps) {
    return (
        <ReactPaginate
            pageCount={pageCount}
            onPageChange={(event) => onPageChange(event.selected + 1)}
            containerClassName={css.pagination}
            activeClassName={css.active}
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
        />
    );
}
