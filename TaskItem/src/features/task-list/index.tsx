import { TextField, Box, CircularProgress } from '@mui/material';
import { TaskItem } from '../../entities/task/ui/TaskItem';
import { useTaskStore } from '../../entities/task/model/task.store';
import { useEffect, useState } from 'react';
import { TaskFilters } from './ui/task-filters';
import { TaskSort } from './ui/task-sort';

export const TaskList = () => {
  const [search, setSearch] = useState('');
  const { getFilteredAndSortedTasks, fetchTasks, loading, error } = useTaskStore();
  const [init, setInit] = useState(false);

  useEffect(() => {
    const loadTasks = async () => {
      await fetchTasks();
      setInit(true);
    };
    loadTasks();
  }, [fetchTasks]);

  if (!init || loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Box sx={{ p: 2, color: 'error.main' }}>Error loading tasks: {error}</Box>;
  }

  const tasks = getFilteredAndSortedTasks().filter(
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
        {tasks.length > 0 ? (
          tasks.map((task) => <TaskItem key={task.id} task={task} />)
        ) : (
          <Box sx={{ p: 2 }}> No tasks found </Box>
        )}
      </Box>
    </Box>
  );
};
