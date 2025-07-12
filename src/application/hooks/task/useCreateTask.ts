import type { Task } from "../../../domain/task/task";
import { createTask } from "../../task/createTask";
import { useBoardStore } from "../../../store/task/useBoardStore";

export const useCreateTask = () => {
  const creatingColumnId = useBoardStore((s) => s.creatingColumnId);

  const handleCreateTask = async (task: Omit<Task, "id">) => {
    const store = useBoardStore.getState();
    store.setCreatingColumnId(task.columnId);
    try {
      const newTask = await createTask(task);
      store.addTaskToColumn(newTask);
      return newTask;
    } catch (error) {
      console.log("Error al crear una tarea");
      throw error;
    } finally {
      store.setCreatingColumnId(null);
    }
  };

  return { creatingColumnId, handleCreateTask };
};
