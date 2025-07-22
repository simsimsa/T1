import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FilterValues, SortField, SortOrder, Task } from './types';
import {
  createTask,
  deleteTask,
  fetchTasks,
  getTaskById,
  updateTask,
} from '../../../shared/api/appwrite';

interface TaskStore {
  error: string | null;
  loading: boolean;
  tasks: Task[];
  fetchTasks: () => Promise<void>;
  createTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Promise<Task | undefined>;
  resetTasks: () => void;
  filters: FilterValues;
  sortField: SortField;
  sortOrder: SortOrder;
  setFilters: (filters: FilterValues) => void;
  setSort: (field: SortField, order: SortOrder) => void;
  getFilteredAndSortedTasks: () => Task[];
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      filters: {},
      sortField: 'createdAt',
      sortOrder: 'desc',
      loading: false,
      error: null,

      fetchTasks: async () => {
        set({ loading: true, error: null });
        try {
          const tasks = await fetchTasks();
          set({ tasks, loading: false });
        } catch (e) {
          set({ error: `Failed to fetch tasks: ${e}`, loading: false });
        }
      },
      setFilters: (filters) => set({ filters }),
      setSort: (field, order) => set({ sortField: field, sortOrder: order }),
      getFilteredAndSortedTasks: () => {
        const { tasks, filters, sortField, sortOrder } = get();
        const filtered = tasks.filter((task) => {
          return (
            (!filters.status || task.status === filters.status) &&
            (!filters.category || task.category === filters.category) &&
            (!filters.priority || task.priority === filters.priority)
          );
        });
        filtered.sort((a, b) => {
          if (sortField === 'priority') {
            const priorityOrder = { High: 3, Medium: 2, Low: 1 };
            return sortOrder === 'asc'
              ? priorityOrder[a.priority] - priorityOrder[b.priority]
              : priorityOrder[b.priority] - priorityOrder[a.priority];
          }
          if (sortField === 'createdAt') {
            return sortOrder === 'asc'
              ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
              : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          }
          return sortOrder === 'asc'
            ? a[sortField].localeCompare(b[sortField])
            : b[sortField].localeCompare(a[sortField]);
        });
        return filtered;
      },

      createTask: async (task) => {
        set({ loading: true });
        try {
          const newTask = await createTask(task);
          set((state) => ({
            tasks: [...state.tasks, newTask],
            loading: false,
          }));
        } catch (error) {
          set({ error: `Failed to create task: ${error}`, loading: false });
        }
      },
      updateTask: async (id, updatedTask) => {
        set({ loading: true });
        try {
          const task = await updateTask(id, updatedTask);
          set((state) => ({
            tasks: state.tasks.map((t) => (t.id === id ? { ...t, ...task } : t)),
            loading: false,
          }));
        } catch (error) {
          set({ error: `Failed to update task: ${error}`, loading: false });
        }
      },
      deleteTask: async (id) => {
        set({ loading: true });
        try {
          await deleteTask(id);
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
            loading: false,
          }));
        } catch (error) {
          set({ error: `Failed to delete task: ${error}`, loading: false });
        }
      },
      getTaskById: async (id) => {
        try {
          return await getTaskById(id);
        } catch (error) {
          set({ error: `Failed to get task: ${error}` });
          return undefined;
        }
      },
      resetTasks: () => set({ tasks: [] }),
    }),
    {
      name: 'task-storage',
      partialize: (state) => ({
        filters: state.filters,
        sortField: state.sortField,
        sortOrder: state.sortOrder,
      }),
    },
  ),
);
