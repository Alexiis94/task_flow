import { create } from "zustand";

interface ActiveColumnStore {
  activeColumnId: string | null;
  setAtiveColumn: (id: string) => void;
  clearActiveColumn: () => void;
}

export const useActiveColumnStore = create<ActiveColumnStore>((set) => ({
  activeColumnId: null,
  setAtiveColumn: (id) => set({ activeColumnId: id }),
  clearActiveColumn: () => set({ activeColumnId: null }),
}));
