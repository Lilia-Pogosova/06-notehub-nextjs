"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { Note, CreateNoteDTO } from "@/types/note";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./NoteForm.module.css";

interface NoteFormProps {
    onClose: () => void;
}

const NoteSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string(), 
    tag: Yup.string()
        .oneOf(["Work", "Personal", "Meeting", "Shopping", "Todo"], "Invalid tag")
        .required("Tag is required"),
});

export default function NoteForm({ onClose }: NoteFormProps) {
    const queryClient = useQueryClient();

    const mutation = useMutation<Note, Error, CreateNoteDTO>({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
            onClose();
        },
    });

    return (
        <Formik
            initialValues={{ title: "", content: "", tag: "Work" }}
            validationSchema={NoteSchema}
            onSubmit={(values) => {
                mutation.mutate({
                    ...values,
                    content: values.content || "",
                });
            }}
        >
            {({ isSubmitting }) => (
                <Form className={css.form}>
                    <div className={css.formGroup}>
                        <label htmlFor="title">Title</label>
                        <Field
                            id="title"
                            name="title"
                            placeholder="Title"
                            className={css.input}
                        />
                        <ErrorMessage name="title" component="div" className={css.error} />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="content">Content</label>
                        <Field
                            as="textarea"
                            id="content"
                            name="content"
                            placeholder="Content"
                            className={css.textarea}
                        />
                        <ErrorMessage
                            name="content"
                            component="div"
                            className={css.error}
                        />
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="tag">Tag</label>
                        <Field as="select" id="tag" name="tag" className={css.select}>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Todo">Todo</option>
                        </Field>
                        <ErrorMessage name="tag" component="div" className={css.error} />
                    </div>

                    <div className={css.actions}>
                        <button
                            type="submit"
                            className={css.submitButton}
                            disabled={isSubmitting}
                        >
                            Create
                        </button>
                        <button
                            type="button"
                            className={css.cancelButton}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
