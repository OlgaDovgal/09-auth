import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "New Note",
  description: "Page to create new note",
  openGraph: {
    title: "New Note",
    description: "Page to create a new note",
    url: "/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Notehub Meta",
        width: 1200,
        height: 630,
      },
    ],
  },
};
const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};
export default CreateNote;
