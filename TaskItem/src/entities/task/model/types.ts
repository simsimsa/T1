export type TaskCategory = 'Bug' | 'Feature' | 'Documentation' | 'Refactor' | 'Test';
export type TaskStatus = 'To Do' | 'In Progress' | 'Done';
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
export const STATUSES: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
export const PRIORITIES: TaskPriority[] = ['Low', 'Medium', 'High'];
