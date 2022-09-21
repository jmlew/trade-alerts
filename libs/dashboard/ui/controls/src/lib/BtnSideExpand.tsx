import { ExpandCircleDownOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

export interface BtnSideExpandProps {
  isDisabled: boolean;
  isExpanded: boolean;
  onClick: () => void;
}

export function BtnSideExpand({ isDisabled, isExpanded, onClick }: BtnSideExpandProps) {
  const transform = isExpanded ? 'rotate(270deg)' : 'rotate(90deg)';
  const buttonTooltip = (isExpanded ? 'Hide' : 'Show') + ' Alerts Panel';
  return (
    <Tooltip title={buttonTooltip} arrow>
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
    </Tooltip>
  );
}
