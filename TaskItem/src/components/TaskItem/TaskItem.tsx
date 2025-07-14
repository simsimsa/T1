import { Card, CardContent, Chip, Button, Typography, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import type { Task } from '../../types/types'

const priorityColor = {
  High: 'error',
  Medium: 'warning',
  Low: 'success'
} as const

const TaskItem = ({ task }: { task: Task }) => (
  <Card sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 3
      }
    }}>
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
        <Chip label={task.status} size="small" />
        <Chip label={task.category} size="small" />
        <Chip 
          label={task.priority} 
          size="small" 
          color={priorityColor[task.priority]}
        />
      </Stack>
      <CardContent sx={{ pt: 0 }}>
        <Button
          component={Link}
          to={`/task/${task.id}`}
          variant="contained"
          fullWidth
        >
          Редактировать
        </Button>
      </CardContent>
    </CardContent>
  </Card>
)

export default TaskItem