import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@mui/material';
import TaskDetails from '../components/TaskDetails/TaskDetails';
import { useTasks } from '../Context/TaskContext';
import type { Task } from '../types/types';

const TaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, addTask, updateTask } = useTasks();

  const existingTask = id ? tasks.find(task => task.id === id) : undefined;

  const handleSave = (taskData: Omit<Task, 'id'> & { id?: string }) => {
    if (taskData.id) {
      updateTask(taskData.id, taskData as Task);
    } else {
      addTask(taskData);
    }
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <TaskDetails
        task={existingTask || {}} 
        onSave={handleSave}
        onCancel={() => navigate('/')}
      />
    </Container>
  );
};

export default TaskPage;