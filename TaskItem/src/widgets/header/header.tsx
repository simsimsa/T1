import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useTaskStore } from '../../entities/task/model/task.store';

export const Header = () => {
  const location = useLocation();
  const { resetTasks } = useTaskStore();

  const handleRefresh = () => {
    resetTasks();
  };

  return (
    <AppBar position="fixed" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: 'none', color: 'inherit' }}
        >
          Task Manager
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={handleRefresh} disabled={location.pathname !== '/'}>
            Refresh
          </Button>

          <Button component={Link} to="/task/new" variant="contained" size="small">
            New Task
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
