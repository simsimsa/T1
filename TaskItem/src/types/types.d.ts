interface Task {
  id: string;
  title: string;
  description?: string;
  category: string;
  status: string;
  priority: PRIORITY;
  createdAt?: string;
  updatedAt?: string;
}

export const PRIORITY_LEVELS = ['Low', 'Medium', 'High'] as const;
  
  export type { Task }