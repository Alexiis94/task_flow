import styles from "./TaskItem.module.css";

import Button from "../../../../components/common/Button";
import { TrashIcon, UpdateIcon } from "../../../../components/common/Icon";
import { useDeleteTask } from "../../../../application/hooks/task/useDeleteTask";
import { useUpdateTask } from "../../../../application/hooks/task/useUpdateTask";
import type { Task } from "../../../../domain/task/task";
import { useState } from "react";
import Input from "../../../../components/common/Input";
import { useBoardStore } from "../../../../store/task/useBoardStore";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const { editingId, setEditingId } = useBoardStore();
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const { id, title, description } = task;
  const { isDeleting, handleRemoveTask } = useDeleteTask();
  const { isUpdatingTask, handleUpdateTask } = useUpdateTask();

  const isActiveUpdate = editingId === id;

  const handleUpdateTaskClick = () => {
    if (!editTitle || !editDescription) return;
    handleUpdateTask(id, {
      ...task,
      title: editTitle,
      description: editDescription,
    });
    setEditingId(null);
  };
  if (isDeleting) {
    return <li className={styles.taskboard_taskItem}>Task is Deleting...</li>;
  }
  if (isUpdatingTask) {
    return <li className={styles.taskboard_taskItem}>Task is Updating...</li>;
  }

  return (
    <li className={styles.taskboard_taskItem}>
      <div className={styles.taskboard_taskItemContent}>
        {!isActiveUpdate && (
          <div className={styles.taskboard_taskItemActions}>
            <Button
              variant="update"
              className={styles.taskBoard_taskItem}
              onClick={() => {
                setEditingId(id);
              }}
            >
              <UpdateIcon />
            </Button>
            <Button
              variant="cancel"
              className={styles.taskBoard_taskItem}
              onClick={() => handleRemoveTask(id)}
            >
              <TrashIcon />
            </Button>
          </div>
        )}

        {isActiveUpdate && id === editingId ? (
          <>
            <Input
              className={styles.taskboard_taskItemTitle}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <Input
              className={styles.taskboard_taskItemDescription}
              value={editDescription}
              type="textarea"
              onChange={(e) => setEditDescription(e.target.value)}
            />
            <div className={styles.taskboard_taskUpdateActions}>
              <Button variant="primary" onClick={() => handleUpdateTaskClick()}>
                Guardar
              </Button>
              <Button variant="cancel" onClick={() => setEditingId(null)}>
                X
              </Button>
            </div>
          </>
        ) : (
          <>
            <h6 className={styles.taskboard_taskItemTitle}>{title}</h6>
            <p className={styles.taskboard_taskItemDescription}>
              {description}
            </p>
          </>
        )}
      </div>
    </li>
  );
};

export default TaskItem;
