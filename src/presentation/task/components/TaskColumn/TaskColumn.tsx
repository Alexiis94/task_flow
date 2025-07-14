import styles from "./TaskColumn.module.css";
import Button from "../../../../components/common/Button";
import TaskItem from "../TaskItem";
import TaskList from "../TaskList";
import type { Task } from "../../../../domain/task/task";
import { useRef, useState } from "react";
import Input from "../../../../components/common/Input";

import { useActiveColumnStore } from "../../../../store/task/useActiveColumnStore";
import { useCreateTask } from "../../../../application/hooks/task/useCreateTask";
import { useClickOutsite } from "../../../../infrastructure/hooks/useClickOutsite";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onAddTask: (task: Omit<Task, "id">) => void;
  columnId: string;
}

const TaskColumn = ({ title, tasks, onAddTask, columnId }: TaskColumnProps) => {
  const [taskTitle, setTaskTitle] = useState<string>("");

  const { creatingColumnId } = useCreateTask();
  const { activeColumnId, setAtiveColumn, clearActiveColumn } =
    useActiveColumnStore();

  const isActive = activeColumnId === columnId;

  // Desactivamos de forma automatica cuando damos click en otra lado
  // que no sea el input activo
  const inputRef = useRef<HTMLDivElement>(null);
  useClickOutsite(inputRef, () => {
    if (isActive) clearActiveColumn();
  });

  const handleCreate = () => {
    if (!taskTitle) return;

    onAddTask({ title: taskTitle, columnId });
    setTaskTitle("");
    clearActiveColumn();
  };

  return (
    <div className={styles.taskboardColumn}>
      {/* header */}
      <div className={styles.taskboardColumnHeader}>
        <h2 className={styles.taskboardColumnTitle}> {title}</h2>

        {/* section task list */}
        <TaskList>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </TaskList>

        {/* Input Activo  */}
        {isActive && (
          <div ref={inputRef}>
            <Input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              autoFocus
            />
            <div className={styles.taskboardColumnActions}>
              <Button variant="primary" onClick={() => handleCreate()}>
                Añade Tarjeta
              </Button>
              {isActive && (
                <Button variant="cancel" onClick={() => clearActiveColumn()}>
                  X
                </Button>
              )}
            </div>
          </div>
        )}
        {/* Boton para activar el input */}
        {!isActive && (
          <div className={styles.taskboardColumnActions}>
            <Button variant="primary" onClick={() => setAtiveColumn(columnId)}>
              + Añade una Tarjeta
            </Button>
          </div>
        )}

        {/* Carga del cargado al crear */}
        {creatingColumnId === columnId && <div>Task Is Creating......</div>}
      </div>
    </div>
  );
};

export default TaskColumn;
