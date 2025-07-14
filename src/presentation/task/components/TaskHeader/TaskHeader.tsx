import styles from "./TaskHeader.module.css";

interface TaskHeaderProps {
  title: string;
}

const TaskHeader = ({ title }: TaskHeaderProps) => {
  return (
    <header className={styles.taskboardHeader}>
      <h1 className={styles.taskboardHeaderTitle}>{title}</h1>
    </header>
  );
};

export default TaskHeader;
