import { create } from "zustand";
import type { Task, TaskColumn } from "../../domain/task/task";
import { getBoardData } from "../../application/task/getBoardData";
import { persist } from "zustand/middleware";

interface BoardStore {
  dataBoard: TaskColumn[];
  isLoading: boolean;
  creatingColumnId: string | null;
  setCreatingColumnId: (value: string | null) => void;
  fetchBoard: () => Promise<void>;
  setDataBoard: (data: TaskColumn[]) => void;
  addTaskToColumn: (task: Task) => void;
  removeTaskToColumn: (id: string) => void;
  addColumn: (column: TaskColumn) => void;
  updateTask: (task: Task) => void;
  editingId: string | null;
  setEditingId: (id: string | null) => void;
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      dataBoard: [],
      isLoading: false,
      creatingColumnId: null,
      editingId: null,
      setEditingId: (id) => set({ editingId: id }),
      setCreatingColumnId: (value) => set({ creatingColumnId: value }),

      fetchBoard: async () => {
        set({ isLoading: true });
        try {
          const data = await getBoardData();
          set({ dataBoard: data });
        } catch (error) {
          console.error("[useBoardStore] Error al obtener board", error);
        } finally {
          set({ isLoading: false });
        }
      },

      setDataBoard: (data) => set({ dataBoard: data }),

      addTaskToColumn: (task) => {
        set((state) => ({
          dataBoard: state.dataBoard.map((column) =>
            column.id === task.columnId
              ? { ...column, tasks: [...(column.tasks || []), task] }
              : column
          ),
        }));
      },

      removeTaskToColumn: (taskId: string) => {
        set((state) => ({
          dataBoard: state.dataBoard.map((column) => ({
            ...column,
            tasks: column.tasks?.filter((task) => task.id !== taskId),
          })),
        }));
      },

      addColumn: (newColumn) => {
        set((state) => ({
          dataBoard: [...state.dataBoard, newColumn],
        }));
      },

      updateTask: (updatedTask) => {
        set((state) => ({
          dataBoard: state.dataBoard.map((column) => ({
            ...column,
            tasks: column.tasks?.map((task) =>
              task.id === updatedTask.id ? updatedTask : task
            ),
          })),
        }));
      },
    }),
    {
      name: "board-storage",
    }
  )
);
