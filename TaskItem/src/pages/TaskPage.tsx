import { Container, CircularProgress, Alert, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTaskStore } from '../entities/task/model/task.store';
import { TaskForm } from '../shared/ui/task-form/task-form';
import { useEffect, useState } from 'react';
import type { Task } from '../entities/task/model/types';

export const TaskPage = () => {
  const { id } = useParams();
  const { getTaskById } = useTaskStore();
  const [task, setTask] = useState<Partial<Task> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isNewTask = !id;

  useEffect(() => {
    if (isNewTask) {
      setLoading(false);
      return;
    }
    const loadTask = async () => {
      try {
        if (id) {
          const fetchedTask = await getTaskById(id);
          setTask(fetchedTask || null);
        }
      } catch (err) {
        setError(`Failed to load task: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id, isNewTask, getTaskById]);

  if (!isNewTask && error) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!isNewTask && !task && loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!isNewTask && !task && !loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mt: 2 }}>
          Task not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <TaskForm
        task={isNewTask ? undefined : task || undefined}
        onSave={() => {}}
        onCancel={() => {}}
      />
    </Container>
  );
};
