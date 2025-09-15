"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className={css.backdrop}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className={css.modal}
                onClick={(e) => e.stopPropagation()} 
            >
                {children}
            </div>
        </div>,
        document.body
    );
}
