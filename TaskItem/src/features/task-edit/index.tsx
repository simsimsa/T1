import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Container } from '@mui/material';
import { TaskForm } from '../../shared/ui/task-form/task-form';
import { useTaskStore } from '../../entities/task/model/task.store';
import type { Task } from '../../entities/task/model/types';
import { useEffect, useState } from 'react';

export const TaskEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTask } = useTaskStore();
  const [task, setTask] = useState<Partial<Task> | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      if (id) {
        try {
          const fetchedTask = await getTaskById(id);
          setTask(fetchedTask || undefined);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadTask();
  }, [id, getTaskById]);

  const handleSubmit = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (id) {
      updateTask(id, taskData);
      navigate('/');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!task && id) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box>Task not found</Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <TaskForm task={task} onSave={handleSubmit} onCancel={() => navigate('/')} />
    </Container>
  );
};
