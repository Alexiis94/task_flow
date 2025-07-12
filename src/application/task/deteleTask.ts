import { deleteTask as deleteTaskService } from "../../infrastructure/api/tasksService";

export const deleteTask = async (id: string): Promise<void> => {
  return await deleteTaskService(id);
};
