import styles from "./TaskColumn.module.css";
import Button from "../../../../components/common/Button";
import TaskItem from "../TaskItem";
import TaskList from "../TaskList";
import type { Task } from "../../../../domain/task/task";
import { useState } from "react";
import Input from "../../../../components/common/Input";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onAddTask: (task: Omit<Task, "id">) => void;
  columnId: string;
  isActive: boolean;
  onActivate: () => void;
  onCancel: () => void;
}

const TaskColumn = ({
  title,
  tasks,
  onAddTask,
  columnId,
  isActive,
  onActivate,
  onCancel,
}: TaskColumnProps) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const handleCreate = () => {
    if (!taskTitle) return;

    onAddTask({ title: taskTitle, columnId });
    setTaskTitle("");
    onCancel();
  };

  return (
    <div className={styles.taskboard__column}>
      {/* header */}
      <div className={styles.taskboard__columnHeader}>
        <h2 className={styles.taskboard__columnTitle}> {title}</h2>

        {/* section task list */}
        <TaskList>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              title={task.title}
              description={task.description}
            />
          ))}
        </TaskList>

        {isActive && (
          <Input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            autoFocus
          />
        )}

        <div className={styles.taskboard__actions}>
          <Button variant="primary" onClick={onActivate}>
            + Añade una Tarjeta
          </Button>
          {isActive && (
            <Button variant="cancel" onClick={onCancel}>
              X
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskColumn;
