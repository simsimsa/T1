import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../widgets/layout/main-layout';
import { HomePage } from '../pages/HomePage';
import { TaskEditPage } from '../features/task-edit';
import { TaskCreatePage } from '../features/task-create';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'task/new',
        element: <TaskCreatePage />,
      },
      {
        path: 'task/:id',
        element: <TaskEditPage />,
      },
    ],
  },
]);
