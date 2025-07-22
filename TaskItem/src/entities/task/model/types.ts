export type TaskCategory = 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
export type TaskStatus = 'To_Do' | 'In_Progress' | 'Done';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export type FilterValues = {
  status?: TaskStatus;
  category?: TaskCategory;
  priority?: TaskPriority;
};

export type SortField = 'createdAt' | 'priority' | 'title';
export type SortOrder = 'asc' | 'desc';

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: TaskCategory;
  status: TaskStatus;
  priority: TaskPriority;
  createdAt: string;
  updatedAt?: string;
}

export const CATEGORIES: TaskCategory[] = ['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'];
export const STATUSES: TaskStatus[] = ['To_Do', 'In_Progress', 'Done'];
export const PRIORITIES: TaskPriority[] = ['Low', 'Medium', 'High'];

export const formatStatus = (status: TaskStatus): string => {
  const statusMap: Record<TaskStatus, string> = {
    To_Do: 'To Do',
    In_Progress: 'In Progress',
    Done: 'Done',
  };
  return statusMap[status] || status;
};
