import { Container, CircularProgress, Alert, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useTaskStore } from '../entities/task/model/task.store';
import { TaskForm } from '../shared/ui/task-form/task-form';

export const TaskPage = () => {
  const { id } = useParams();
  const { getTaskById } = useTaskStore();

  const task = id ? getTaskById(id) : null;
  const isNewTask = !id;

  if (!isNewTask && !task) {
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
      {!isNewTask && !task ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TaskForm task={task || undefined} onSave={() => {}} onCancel={() => {}} />
      )}
    </Container>
  );
};
