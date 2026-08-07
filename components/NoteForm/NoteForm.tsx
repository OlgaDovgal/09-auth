"use client";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { CreateNoteFormValues } from "@/types/note";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api/clientApi";

const Schema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 symbols")
    .max(50, "Title must be less than 50 symbols")
    .required("Title must be required"),
  content: Yup.string().max(500, "Content must be less than 500 symbols"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("Tag must be required"),
});
export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      clearDraft();
      router.push("/notes/filter/all");
      toast.success("Note is successfully created!");
    },
  });
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event?.target.name]: event?.target.value,
    });
  };
  const handleSubmit = async (formData: FormData) => {
    const values: CreateNoteFormValues = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as string,
    };
    try {
      await Schema.validate(values, { abortEarly: false });

      mutation.mutate(values);
    } catch (error) {
      toast.error(`Заповніть всі поля, ${error}`);
    }
  };
  const handleCancel = () => router.push("/notes/filter/all");
  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft.title}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft.content}
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          Create note
        </button>
      </div>
    </form>
  );
}
