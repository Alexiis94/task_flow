import styles from "./Taskboard.module.css";

import TaskHeader from "../components/TaskHeader";

import TaskColumn from "../components/TaskColumn";
import { useBoardData } from "../../../application/hooks/useBoardData";
import { useCreateTask } from "../../../application/hooks/useCreateTask";

import type { Task } from "../../../domain/task/task";
import { useState } from "react";

const TaskBoard = () => {
  const [activeColumnId, setActiveColumnId] = useState<string | null>(null);

  const { dataBoard, setDataBoard, isLoading } = useBoardData();
  const { handleCreateTask } = useCreateTask();

  const getTasksByColumnId = (id: string) => {
    return dataBoard.find((column) => column.id === id)?.tasks || [];
  };

  const addTaskToColumn = async (task: Omit<Task, "id">) => {
    try {
      const newTask = await handleCreateTask(task);

      setDataBoard((prev: any) =>
        prev.map((col: any) =>
          col.id === newTask.columnId
            ? { ...col, tasks: [...(col.tasks || []), newTask] }
            : col
        )
      );
    } catch (error) {
      console.log("Error al crear una Tarea", error);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.taskboard}>
      {/* section header */}
      <TaskHeader title="Task Board" />

      {/* task columns */}
      <div className={styles.taskboard__columns}>
        {dataBoard.map((column) => (
          <TaskColumn
            key={column.id}
            title={column.title}
            tasks={getTasksByColumnId(column.id)}
            columnId={column.id}
            onAddTask={addTaskToColumn}
            isActive={activeColumnId === column.id}
            onActivate={() => setActiveColumnId(column.id)}
            onCancel={() => setActiveColumnId(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
