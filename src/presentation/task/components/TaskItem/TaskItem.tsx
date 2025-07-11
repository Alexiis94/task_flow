import styles from "./TaskItem.module.css";

interface TaskItemProps {
  title: string;
  description?: string;
}

const TaskItem = ({ title, description }: TaskItemProps) => {
  return (
    <li className={styles.taskboard_taskItem}>
      <div className={styles.taskboard_taskItemContent}>
        <p className={styles.taskboard_taskItemTitle}>{title}</p>
        <p className={styles.taskboard_taskItemDescription}>{description}</p>
      </div>
    </li>
  );
};

export default TaskItem;
