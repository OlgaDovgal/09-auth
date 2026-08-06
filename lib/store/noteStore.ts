import { CreateNoteFormValues } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const initialDraft = {
  title: "",
  content: "",
  tag: "Todo",
};
type NoteDraftStore = {
  draft: CreateNoteFormValues;
  setDraft: (note: CreateNoteFormValues) => void;
  clearDraft: () => void;
};
export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set(() => ({
          draft: note,
        })),
      clearDraft: () =>
        set(() => ({
          draft: initialDraft,
        })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({
        draft: state.draft,
      }),
    },
  ),
);
