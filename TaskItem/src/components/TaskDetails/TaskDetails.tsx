import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Stack, 
  Typography,
  MenuItem,
  Box
} from '@mui/material';
import type { Task } from '../../types/types';

const DEFAULT_TASK_VALUES: Omit<Task, 'id'> = {
  title: '',
  description: '',
  category: 'Feature',
  status: 'To Do',
  priority: 'Medium'
};

const TaskDetails = ({
  task: initialTask,
  onSave,
  onCancel
}: {
  task: Partial<Task>;
  onSave: (task: Omit<Task, 'id'> & { id?: string }) => void;
  onCancel: () => void;
}) => {
  const [task, setTask] = useState<Task>({
    ...DEFAULT_TASK_VALUES,
    ...initialTask
  } as Task);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: keyof Task, value: string) => {
    setTask(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    
    if (!task.title.trim()) return;
    
    const taskToSave = {
      title: task.title.trim(),
      description: task.description,
      category: task.category,
      status: task.status,
      priority: task.priority,
      ...(initialTask.id && { id: initialTask.id }) 
    };
    
    onSave(taskToSave);
  };

  return (
    <Card sx={{ maxWidth: 800, margin: '0 auto', p: 3 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          {initialTask.id ? 'Edit Task' : 'Create New Task'}
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            fullWidth
            margin="normal"
            required
            value={task.title}
            onChange={handleChange}
            error={submitAttempted && !task.title.trim()}
            helperText={submitAttempted && !task.title.trim() ? 'Title is required' : ''}
          />
          
          <TextField
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={task.description || ''}
            onChange={handleChange}
          />
          
          <TextField
            select
            label="Category"
            fullWidth
            margin="normal"
            value={task.category}
            onChange={(e) => handleSelectChange('category', e.target.value)}
          >
            {['Bug', 'Feature', 'Documentation', 'Refactor', 'Test'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          
          <TextField
            select
            label="Status"
            fullWidth
            margin="normal"
            value={task.status}
            onChange={(e) => handleSelectChange('status', e.target.value)}
          >
            {['To Do', 'In Progress', 'Done'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          
          <TextField
            select
            label="Priority"
            fullWidth
            margin="normal"
            value={task.priority}
            onChange={(e) => handleSelectChange('priority', e.target.value)}
          >
            {['Low', 'Medium', 'High'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button 
              variant="outlined" 
              onClick={onCancel}
              size="large"
              fullWidth
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              size="large"
              fullWidth
              disabled={!task.title.trim()}
            >
              Save Task
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskDetails;