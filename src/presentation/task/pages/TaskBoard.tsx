import styles from "./Taskboard.module.css";

import { useRef, useState } from "react";

import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";

import TaskHeader from "../components/TaskHeader";
import TaskColumn from "../components/TaskColumn";

import { useBoardData } from "../../../application/hooks/task/useBoardData";
import { useCreateTask } from "../../../application/hooks/task/useCreateTask";

import type { Task } from "../../../domain/task/task";
import { useClickOutsite } from "../../../infrastructure/hooks/useClickOutsite";
import { useCreateColumn } from "../../../application/hooks/task/useCreateColumn";

const TaskBoard = () => {
  const [isAddingColumn, setIsAddingColumn] = useState<boolean>(false);
  const [columnTitle, setColumnTitle] = useState<string>("");

  const { isLoading, dataBoard } = useBoardData();
  const { handleCreateTask } = useCreateTask();
  const { handleCreateColumn, isCreatingColumn } = useCreateColumn();

  // Desactivamos input cuando damos click en otra lado
  // que no sea el input activo
  const inputRef = useRef<HTMLDivElement>(null);
  useClickOutsite(inputRef, () => {
    if (isAddingColumn) setIsAddingColumn(false);
  });

  const handleAddTask = async (task: Omit<Task, "id">) => {
    try {
      await handleCreateTask(task);
    } catch (error) {
      console.error("Error creando tarea", error);
    }
  };

  const handleAddColumn = async () => {
    try {
      await handleCreateColumn(columnTitle);
      setColumnTitle("");
      setIsAddingColumn(false);
    } catch (error) {
      console.error("Error creando columna", error);
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
      <div className={styles.tasskboard__wrapper}>
        <div className={styles.taskboard__columns}>
          {dataBoard.map((column) => (
            <TaskColumn
              key={column.id}
              title={column.title}
              tasks={column.tasks ?? []}
              columnId={column.id}
              onAddTask={handleAddTask}
            />
          ))}

          {isCreatingColumn ? (
            <div className={styles.taskboard__input}>Creando Columna....</div>
          ) : (
            <div
              className={`${
                isAddingColumn ? styles.taskboard__addingColumn : ""
              }`}
            >
              {isAddingColumn && (
                <div ref={inputRef}>
                  <Input
                    placeHolder="Ingrese titulo"
                    className={styles.taskboard__input}
                    onChange={(e) => setColumnTitle(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddColumn()}
                    autoFocus
                  />
                </div>
              )}
              <Button
                variant="tertiary"
                onClick={() => setIsAddingColumn(true)}
              >
                {isAddingColumn ? "Añade Columna" : "+ Añadir Columna"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;
