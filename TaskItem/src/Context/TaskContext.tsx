import { createContext, useContext, useState, useEffect } from 'react';
import type { Task } from '../types/types';

const STORAGE_KEY = 'task-manager-tasks';

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Task) => void;
  deleteTask: (id: string) => void;
};

const TaskContext = createContext<TaskContextType>(null!);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    console.log('Saved tasks:', tasks);
  }, [tasks]);

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const taskWithId: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setTasks(prevTasks => [...prevTasks, taskWithId]);
  };

  const updateTask = (id: string, updatedTask: Task) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...updatedTask, updatedAt: new Date().toISOString() } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => useContext(TaskContext);