import { ExpandCircleDownOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export interface BtnSideExpandProps {
  isDisabled: boolean;
  isExpanded: boolean;
  onClick: () => void;
}

export function BtnSideExpand({ isDisabled, isExpanded, onClick }: BtnSideExpandProps) {
  const transform = isExpanded ? 'rotate(270deg)' : 'rotate(90deg)';
  return (
    <IconButton
      disabled={isDisabled}
      onClick={onClick}
      edge="end"
      color="primary"
      aria-label="update-alert"
      sx={{ ml: 2 }}
    >
      <ExpandCircleDownOutlined
        sx={{ transform, transition: 'transform 150ms ease-out' }}
      />
    </IconButton>
  );
}
