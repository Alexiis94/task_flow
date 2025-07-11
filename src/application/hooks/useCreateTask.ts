import { useState } from "react";
import type { Task } from "../../domain/task/task";
import { createTask } from "../task/createTasks";

export const useCreateTask = () => {
  const [isCreating, setIsCreating] = useState<Boolean>(false);

  //   Creo un Nueva Tarea
  const handleCreateTask = async (task: Omit<Task, "id">) => {
    setIsCreating(true);
    try {
      const newTask = createTask(task);
      return newTask;
    } catch (error) {
      console.log("Error al crear una tarea");
      throw error;
    }
  };

  return { handleCreateTask, isCreating };
};
