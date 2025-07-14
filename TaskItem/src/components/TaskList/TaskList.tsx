import { TextField, Box } from '@mui/material'
import TaskItem from '../TaskItem/TaskItem'
import { useTasks } from '../../Context/TaskContext'
import { useState } from 'react'

const TaskList = () => {
  const { tasks } = useTasks()
  const [search, setSearch] = useState('')

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description?.toLowerCase().includes(search.toLowerCase())
  )

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
            <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        justifyContent: 'flex-start'
      }}>
        {filteredTasks.map(task => (
          <Box key={task.id} sx={{
            flex: '1 1 calc(33.333% - 16px)',
            minWidth: 300,
            maxWidth: '48%'
          }}>
            <TaskItem task={task} />
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default TaskList