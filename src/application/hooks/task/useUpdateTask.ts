import { useState } from "react";
import type { Task } from "../../../domain/task/task";
import { useBoardStore } from "../../../store/task/useBoardStore";
import { updateTask } from "../../task/updateTask";

export const useUpdateTask = () => {
  const [isUpdatingTask, setIsUpdatingTask] = useState<boolean>(false);
  const store = useBoardStore.getState();

  const handleUpdateTask = async (id: string, task: Task) => {
    setIsUpdatingTask(true);
    try {
      const updatedTask = await updateTask(id, task);
      store.updateTask(updatedTask);
    } catch (error) {
      console.log("Error al actualizar la tarea");
      throw error;
    } finally {
      setIsUpdatingTask(false);
    }
  };
  return { isUpdatingTask, handleUpdateTask };
};
