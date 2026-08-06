"use client";
import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";
import css from "./Notes.page.module.css";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import { useRouter } from "next/navigation";
interface NotesClientProps {
  tag?: string;
}
const NotesClient = ({ tag }: NotesClientProps) => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isSuccess } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: keepPreviousData,
  });
  const handleSearch = useDebouncedCallback((search: string) => {
    setSearch(search);
    setPage(1);
  }, 1000);
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {isSuccess && totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button
          className={css.button}
          onClick={() => router.push("/notes/action/create")}
        >
          Create note +
        </button>
      </header>
      {notes.length > 0 && <NoteList notes={notes} />}
      <Toaster />
    </div>
  );
};
export default NotesClient;
