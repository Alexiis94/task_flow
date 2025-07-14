import styles from "./TaskHeader.module.css";

interface TaskHeaderProps {
  title: string;
}

const TaskHeader = ({ title }: TaskHeaderProps) => {
  return (
    <div className={styles.taskboardHeader}>
      <h1 className={styles.taskboardHeaderTitle}>{title}</h1>
    </div>
  );
};

export default TaskHeader;
