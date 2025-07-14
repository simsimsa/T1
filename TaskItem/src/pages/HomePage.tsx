import { Container, Typography, Button, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import TaskList from '../components/TaskList/TaskList'

const HomePage = () => (
  <Container maxWidth='md' sx={{
    width: '100%'
  }}>
    <Typography variant="h4" component="h1" gutterBottom textAlign="center">
      Task manager
    </Typography>
    <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Button 
        component={Link} 
        to="/task/new" 
        variant="contained" 
        sx={{ mb: 3,
            display: 'inline-block',
            mx: 'auto'
        }}
        >
            Add New Task
        </Button>
    </Box>
    <TaskList />
  </Container>
)

export default HomePage