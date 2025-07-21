import { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextareaAutosize,
} from '@mui/material';
import type {
  Task,
  TaskCategory,
  TaskPriority,
  TaskStatus,
} from '../../../entities/task/model/types';
import { CATEGORIES, STATUSES, PRIORITIES } from '../../utils/constants';
import { Link } from 'react-router-dom';

interface TaskFormProps {
  task?: Partial<Task>;
  onSave: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export const TaskForm = ({ task, onSave, onCancel }: TaskFormProps) => {
  const [formData, setFormData] = useState<Omit<Task, 'id' | 'createdAt'>>({
    title: '',
    description: '',
    category: 'Feature',
    status: 'To Do',
    priority: 'Medium',
    ...task,
  });

  const [errors, setErrors] = useState({
    title: false,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        category: task.category || 'Feature',
        status: task.status || 'To Do',
        priority: task.priority || 'Medium',
      });
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setErrors({ ...errors, title: true });
      return;
    }

    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          label="Title*"
          value={formData.title}
          onChange={(e) => {
            setFormData({ ...formData, title: e.target.value });
            setErrors({ ...errors, title: false });
          }}
          fullWidth
          error={errors.title}
          helperText={errors.title ? 'Title is required' : ''}
        />

        <FormControl fullWidth>
          <InputLabel>Description</InputLabel>
          <TextareaAutosize
            minRows={3}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            style={{
              width: '100%',
              padding: '8px',
              fontFamily: 'inherit',
              fontSize: 'inherit',
            }}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value as Task['category'] })
            }
            label="Category"
          >
            {CATEGORIES.map((cat: TaskCategory) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
            label="Status"
          >
            {STATUSES.map((status: TaskStatus) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value as Task['priority'] })
            }
            label="Priority"
          >
            {PRIORITIES.map((priority: TaskPriority) => (
              <MenuItem key={priority} value={priority}>
                {priority}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button
            component={Link}
            variant="contained"
            to="/"
            onClick={onCancel}
            sx={{ width: 120 }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" sx={{ width: 120 }}>
            Save
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
