import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import { TaskForm } from '../../shared/ui/task-form/task-form';
import { useTaskStore } from '../../entities/task/model/task.store';
import type { Task } from '../../entities/task/model/types';

export const TaskEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTask } = useTaskStore();

  const task = id ? getTaskById(id) : undefined;

  const handleSubmit = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (id) {
      updateTask(id, taskData);
      navigate('/');
    }
  };

  if (!task && id) {
    return <div>Task not found</div>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <TaskForm task={task} onSave={handleSubmit} onCancel={() => navigate('/')} />
    </Container>
  );
};
