export interface TaskColumn {
  id: string;
  title: string;
  tasks?: Task[];
}

export interface Task {
  id: string;
  title: string;
  columnId: string;
  description?: string;
}
