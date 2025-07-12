import type { TaskColumn } from "../../domain/task/task";
import { createColumns } from "../../infrastructure/api/columnsService";

export const createColumn = async (title: string): Promise<TaskColumn> => {
  return await createColumns(title);
};
