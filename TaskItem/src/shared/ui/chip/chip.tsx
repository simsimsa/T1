import { Chip as MuiChip, type ChipProps as MuiChipProps } from '@mui/material';
import type { TaskCategory, TaskStatus, TaskPriority } from '../../../entities/task/model/types';

type ChipType = 'category' | 'status' | 'priority';

interface ChipProps {
  type: ChipType;
  value: TaskCategory | TaskStatus | TaskPriority;
  size?: MuiChipProps['size'];
}

const typeStyles: Record<ChipType, Record<string, MuiChipProps['color']>> = {
  category: {
    Bug: 'error',
    Feature: 'success',
    Documentation: 'info',
    Refactor: 'warning',
    Test: 'secondary',
  },
  status: {
    'To Do': 'default',
    'In Progress': 'primary',
    Done: 'success',
  },
  priority: {
    Low: 'info',
    Medium: 'warning',
    High: 'error',
  },
};

const getChipProps = (type: ChipType, value: string): MuiChipProps => {
  const color = typeStyles[type]?.[value] || 'default';
  const variant = type === 'status' ? 'outlined' : 'filled';

  return {
    color,
    variant,
    label: value,
    sx: {
      fontWeight: 500,
      textTransform: 'capitalize',
      ...(type === 'priority'
        ? {
            minWidth: 80,
          }
        : {}),
    },
  };
};

export const Chip = ({ type, value, size = 'small' }: ChipProps) => {
  return <MuiChip size={size} {...getChipProps(type, value)} />;
};
