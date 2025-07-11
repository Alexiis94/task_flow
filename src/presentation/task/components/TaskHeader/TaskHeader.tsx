import styles from "./TaskHeader.module.css";

interface TaskHeaderProps {
  title: string;
}

const TaskHeader = ({ title }: TaskHeaderProps) => {
  return (
    <div className={styles.taskboard__header}>
      <h1 className={styles.taskboard__headerTitle}>{title}</h1>
    </div>
  );
};

export default TaskHeader;
