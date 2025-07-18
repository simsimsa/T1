import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { useTaskStore } from "../../../entities/task/model/task.store"
import { Sort as SortIcon } from '@mui/icons-material';

export const TaskSort = () =>{
    const {sortField, sortOrder, setSort} = useTaskStore();

    const sortOptions = [
        { field: 'createdAt', label: 'Date' },
        { field: 'priority', label: 'Priority' },
        { field: 'title', label: 'Title' }
    ] as const;

    return (
        <Box sx={{dispay: 'flex', alignItems: 'center', gap: 2, mb: 2}}>
            <Typography variant="body2" sx={{display:'flex', alignItems: 'center'}}>
                <SortIcon sx={{mr:1}}/>Sort by:
            </Typography>
            <ButtonGroup size="small">
                {sortOptions.map((option)=>(
                    <Button key={option.field}
                    variant={sortField===option.field ? 'contained': 'outlined'}
                    onClick={()=>{
                        const newOrder = sortField === option.field && sortOrder === 'asc' ? 'desc' : 'asc';
                        setSort(option.field, newOrder);
                    }}>
                        {option.label} {sortField === option.field && sortOrder === 'asc' ? '↑' : '↓'}
                    </Button>
                ))}
            </ButtonGroup>
        </Box>
    )
}