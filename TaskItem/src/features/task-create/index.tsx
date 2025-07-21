import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { TaskForm } from '../../shared/ui/task-form/task-form';
import { useTaskStore } from '../../entities/task/model/task.store';
import type { Task } from '../../entities/task/model/types';

export const TaskCreatePage = () => {
  const navigate = useNavigate();
  const { createTask } = useTaskStore();

  const handleSubmit = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    createTask(taskData);
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <TaskForm onSave={handleSubmit} onCancel={() => navigate('/')} />
    </Container>
  );
};
