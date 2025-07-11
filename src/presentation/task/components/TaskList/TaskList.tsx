import styles from "./TaskList.module.css";

interface TaskListProps {
  children: React.ReactNode;
}

const TaskList = ({ children }: TaskListProps) => {
  return <ul className={styles.taskboard_taskList}>{children}</ul>;
};

export default TaskList;
