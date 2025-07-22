import { Box, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useTaskStore } from '../../../entities/task/model/task.store';
import { STATUSES } from '../../../shared/utils/constants';
import { CATEGORIES, formatStatus } from '../../../entities/task/model/types';

export const TaskFilters = () => {
  const { filters, setFilters } = useTaskStore();

  const handleFilterChange = (key: keyof typeof filters, value?: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const clearFilter = (key: keyof typeof filters) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    setFilters(newFilters);
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel>Status</InputLabel>
        <Select
          value={filters.status || ''}
          onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
          label="Status"
        >
          <MenuItem value="">All statuses</MenuItem>
          {STATUSES.map((status) => (
            <MenuItem key={status} value={status}>
              {formatStatus(status)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel>Category</InputLabel>
        <Select
          value={filters.category || ''}
          onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
          label="Category"
        >
          <MenuItem value="">All Categories</MenuItem>
          {CATEGORIES.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel>Priority</InputLabel>
        <Select
          value={filters.priority || ''}
          onChange={(e) => handleFilterChange('priority', e.target.value || undefined)}
          label="Priority"
        >
          <MenuItem value="">All prioritets</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {Object.entries(filters).map(
          ([key, value]) =>
            value && (
              <Chip
                key={key}
                label={`${key}:${value}`}
                onDelete={() => clearFilter(key as keyof typeof filters)}
              />
            ),
        )}
      </Box>
    </Box>
  );
};
