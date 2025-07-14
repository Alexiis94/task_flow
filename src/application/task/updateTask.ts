import type { Task } from "../../domain/task/task";
import { updateTask as updateTaskService } from "../../infrastructure/api/tasksService";

export const updateTask = async (
  id: string,
  task: Partial<Task>
): Promise<Task> => {
  return await updateTaskService(id, task);
};
