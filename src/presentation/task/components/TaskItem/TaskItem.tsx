import styles from "./TaskItem.module.css";

import Button from "../../../../components/common/Button";
import { TrashIcon } from "../../../../components/common/Icon";
import { useDeleteTask } from "../../../../application/hooks/task/useDeleteTask";

interface TaskItemProps {
  id: string;
  title: string;
  description?: string;
}

const TaskItem = ({ id, title, description }: TaskItemProps) => {
  const { isDeleting, handleRemoveTask } = useDeleteTask();

  if (isDeleting) {
    return <li className={styles.taskboard_taskItem}>Task is Deleting...</li>;
  }

  return (
    <li className={styles.taskboard_taskItem}>
      <div className={styles.taskboard_taskItemContent}>
        <Button
          variant="cancel"
          className={styles.taskBoard_taskItem_delete}
          onClick={() => handleRemoveTask(id)}
        >
          <TrashIcon />
        </Button>
        <h6 className={styles.taskboard_taskItemTitle}>{title}</h6>
        <p className={styles.taskboard_taskItemDescription}>{description}</p>
      </div>
    </li>
  );
};

export default TaskItem;
