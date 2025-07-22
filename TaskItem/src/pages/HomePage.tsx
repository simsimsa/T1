import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { TaskList } from '../features/task-list';
import { useEffect } from 'react';
import { fetchTasks } from '../shared/api/appwrite';

export const HomePage = () => {
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        console.log('Tasks from Appwrite:', tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    loadTasks();
  }, []);
  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          textAlign: 'center',
          mt: 3,
          mb: 4,
          fontWeight: 500,
        }}
      >
        Task Manager
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 4,
        }}
      >
        <Button
          component={Link}
          to="/task/new"
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            fontSize: '1rem',
          }}
        >
          Create New Task
        </Button>
      </Box>

      <TaskList />
    </Container>
  );
};
