import { Card, CardContent, Button, Typography, Stack, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Chip } from '../../../shared/ui/chip/chip';
import type { Task } from '../model/types';
import { useTaskStore } from '../model/task.store';

interface TaskItemProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const { deleteTask } = useTaskStore();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    deleteTask(task.id);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
      }}
    >
      <IconButton
        aria-label="delete"
        onClick={handleDelete}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: 'error.main',
          '&:hover': {
            backgroundColor: 'rgba(255, 0, 0, 0.3)',
          },
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {task.title}
        </Typography>
        {task.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {task.description}
          </Typography>
        )}
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
          <Chip type="status" value={task.status} />
          <Chip type="category" value={task.category} />
          <Chip type="priority" value={task.priority} />
        </Stack>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </Typography>
        {task.updatedAt && (
          <Typography variant="caption" display="block">
            Updated: {new Date(task.updatedAt).toLocaleDateString()}
          </Typography>
        )}
      </CardContent>
      <CardContent>
        <Button component={Link} to={`/task/${task.id}`} variant="contained" fullWidth>
          Edit
        </Button>
      </CardContent>
    </Card>
  );
};
