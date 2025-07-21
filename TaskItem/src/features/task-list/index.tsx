import { TextField, Box } from '@mui/material';
import { TaskItem } from '../../entities/task/ui/TaskItem';
import { useTaskStore } from '../../entities/task/model/task.store';
import { useState } from 'react';
import { TaskFilters } from './ui/task-filters';
import { TaskSort } from './ui/task-sort';

export const TaskList = () => {
  const [search, setSearch] = useState('');
  const { getFilteredAndSortedTasks } = useTaskStore();

  const getTasks = getFilteredAndSortedTasks().filter(
    (task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box sx={{ p: 2 }}>
      <TextField
        label="Search tasks"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TaskFilters />
      <TaskSort />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 3,
        }}
      >
        {getTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </Box>
    </Box>
  );
};
