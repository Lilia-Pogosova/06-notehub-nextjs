"use client";

import React from "react";
import css from "./SearchBox.module.css";


interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchBox({
    value,
    onChange,
    placeholder = "Search notes",
}: SearchBoxProps) {
    return (
        <input
            type="text"
            className={css.input}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    );
}
