import type { Task, TaskColumn } from "../../domain/task/task";

export const mapColumnsWithTasks = (
  columns: TaskColumn[],
  tasks: Task[]
): TaskColumn[] => {
  return columns.map((column: TaskColumn) => ({
    ...column,
    tasks: tasks.filter((task: Task) => task.columnId === column.id),
  }));
};
