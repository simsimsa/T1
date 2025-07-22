import { Client, Databases } from 'appwrite';
import type { Task, TaskCategory, TaskPriority, TaskStatus } from '../../entities/task/model/types';

const client = new Client()
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('687e71fe001dc33d6a00');

const databases = new Databases(client);
const DATABASE_ID = 'tasks';
const COLLECTION_ID = 'tasks';

export const fetchTasks = async (): Promise<Task[]> => {
  const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
  return response.documents.map((doc) => ({
    id: doc.$id,
    title: doc.title,
    description: doc.description,
    category: doc.category as TaskCategory,
    status: doc.status as TaskStatus,
    priority: doc.priority as TaskPriority,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  }));
};

export const createTask = async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
  const doc = await databases.createDocument(DATABASE_ID, COLLECTION_ID, 'unique()', {
    ...task,
    createdAt: new Date().toISOString(),
  });

  return {
    id: doc.$id,
    title: doc.title,
    description: doc.description,
    category: doc.category as TaskCategory,
    status: doc.status as TaskStatus,
    priority: doc.priority as TaskPriority,
    createdAt: doc.createdAt,
  };
};

export const updateTask = async (id: string, task: Partial<Task>): Promise<Task> => {
  const doc = await databases.updateDocument(DATABASE_ID, COLLECTION_ID, id, {
    ...task,
    updatedAt: new Date().toISOString(),
  });

  return {
    id: doc.$id,
    title: doc.title,
    description: doc.description,
    category: doc.category as TaskCategory,
    status: doc.status as TaskStatus,
    priority: doc.priority as TaskPriority,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

export const deleteTask = async (id: string): Promise<void> => {
  await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, id);
};

export const getTaskById = async (id: string): Promise<Task | undefined> => {
  try {
    const doc = await databases.getDocument(DATABASE_ID, COLLECTION_ID, id);
    return {
      id: doc.$id,
      title: doc.title,
      description: doc.description,
      category: doc.category as TaskCategory,
      status: doc.status as TaskStatus,
      priority: doc.priority as TaskPriority,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return undefined;
  }
};
