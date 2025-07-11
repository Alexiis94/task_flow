import { getColumns, getTasks } from "../../infrastructure/api";
import type { Task, TaskColumn } from "../../domain/task/task";

export const getBoardData = async (): Promise<TaskColumn[]> => {
  try {
    const [columns, tasks] = await Promise.all([getColumns(), getTasks()]);

    const columnsWithTasks = columns.map((column: TaskColumn) => ({
      ...column,
      tasks: tasks.filter((task: Task) => task.columnId === column.id),
    }));
    return columnsWithTasks;
  } catch (error) {
    console.log("Error al obtener datos del board:", error);

    return [];
  }
};
