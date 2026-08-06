"use client";
import { useParams, useRouter } from "next/navigation";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";
const NotePreviewClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const {
    data: note,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });
  return (
    <>
      {isError && <p>Something went wrong.</p>}
      {isLoading && <p>Loading, please wait...</p>}
      {note && (
        <Modal onClose={() => router.back()}>
          <div className={css.container}>
            <div className={css.item}>
              <div className={css.header}>
                <h2>{note?.title}</h2>
              </div>
              <p className={css.tag}>{note?.tag}</p>
              <p className={css.content}>{note?.content}</p>
              <p className={css.date}>{note?.createdAt}</p>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
export default NotePreviewClient;
