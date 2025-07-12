import { getColumns, getTasks } from "../../infrastructure/api";
import type { TaskColumn } from "../../domain/task/task";
import { mapColumnsWithTasks } from "../../adapter/task/TaskAdapter";

export const getBoardData = async (): Promise<TaskColumn[]> => {
  try {
    const [columns, tasks] = await Promise.all([getColumns(), getTasks()]);

    const columnsWithTasks = mapColumnsWithTasks(columns, tasks);

    return columnsWithTasks;
  } catch (error) {
    console.error("[getBoardData] Error al obtener datos del board:", error);

    return [];
  }
};
