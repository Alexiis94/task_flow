import styles from "./TaskList.module.css";

interface TaskListProps {
  children: React.ReactNode;
}

const TaskList = ({ children }: TaskListProps) => {
  return <ul className={styles.taskList}>{children}</ul>;
};

export default TaskList;
