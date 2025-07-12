import { useState } from "react";
import { useBoardStore } from "../../../store/task/useBoardStore";
import { deleteTask } from "../../task/deteleTask";

export const useDeleteTask = () => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { removeTaskToColumn } = useBoardStore();

  const handleRemoveTask = async (taskId: string) => {
    setIsDeleting(true);
    try {
      await deleteTask(taskId);
      removeTaskToColumn(taskId);
    } catch (error) {
      console.log("Error al eliminar una tarea");
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  return { isDeleting, handleRemoveTask };
};
