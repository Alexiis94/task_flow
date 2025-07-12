import type { Task } from "../../domain/task/task";
import { createTask as createTaskService } from "../../infrastructure/api/tasksService";

export const createTask = async (task: Omit<Task, "id">): Promise<Task> => {
  return await createTaskService(task);
};
