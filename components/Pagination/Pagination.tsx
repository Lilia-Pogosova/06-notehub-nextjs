// components/Pagination/Pagination.tsx
"use client";

import ReactPaginate from "react-paginate";
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
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageCount={totalPages}
      forcePage={page - 1} // ReactPaginate 0-based
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      onPageChange={(selectedItem) => onPageChange(selectedItem.selected + 1)}
      containerClassName={css.pagination}
      pageClassName=""
      pageLinkClassName=""
      previousClassName=""
      previousLinkClassName=""
      nextClassName=""
      nextLinkClassName=""
      breakClassName=""
      breakLinkClassName=""
      activeClassName={css.active}
    />
  );
}
