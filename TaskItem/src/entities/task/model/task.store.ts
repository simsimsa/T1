import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { FilterValues, SortField, SortOrder, Task } from './types';

interface TaskStore {
  tasks: Task[];
  createTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
  resetTasks: ()=>void;
  filters: FilterValues;
  sortField: SortField;
  sortOrder: SortOrder;
  setFilters: (filters: FilterValues) => void;
  setSort: (field: SortField, order: SortOrder) =>void;
  getFilteredAndSortedTasks: ()=>Task[];
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      filters: {},
      sortField: 'createdAt',
      sortOrder: 'desc',
      setFilters: (filters) => set({filters}),
      setSort: (field, order) => set({sortField: field, sortOrder: order}),
      getFilteredAndSortedTasks: () =>{
        const {tasks, filters, sortField, sortOrder} = get();
        const filtered = tasks.filter(task => {
            return (
            (!filters.status || task.status === filters.status) &&
            (!filters.category || task.category === filters.category) &&
            (!filters.priority || task.priority === filters.priority)
            );
        });
        filtered.sort((a, b) => {
            if (sortField === 'priority') {
                const priorityOrder = {'High': 3, 'Medium': 2, 'Low': 1};
                return sortOrder === 'asc' ? priorityOrder[a.priority] - priorityOrder[b.priority]
                : priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            if (sortField === 'createdAt'){
                return sortOrder === 'asc'
                ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            }
            return sortOrder === 'asc'
            ? a[sortField].localeCompare(b[sortField])
            : b[sortField].localeCompare(a[sortField]);
        })
        return filtered;
      },

      createTask: (task) => {
        const newTask: Task = {
          ...task,
          id: uuidv4(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },
      updateTask: (id, updatedTask) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? { ...task, ...updatedTask, updatedAt: new Date().toISOString() }
              : task
          ),
        }));
      },
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },
      getTaskById: (id) => {
        return get().tasks.find((task) => task.id === id);
      },
      resetTasks: ()=> set({tasks: [] })
    }),
    {
      name: 'task-storage',
      partialize: (state) => ({
        tasks: state.tasks,
        filters: state.filters,
        sortField: state.sortField,
        sortOrder: state.sortOrder
      })
    }
  )
);