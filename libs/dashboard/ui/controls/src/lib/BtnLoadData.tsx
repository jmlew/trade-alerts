import { ChevronRight } from '@mui/icons-material';
import { Button } from '@mui/material';

const styles = {
  root: { whiteSpace: 'nowrap' },
};

interface BtnLoadDataProps {
  isDisabled: boolean;
  onClick: () => void;
}

export function BtnLoadData({ isDisabled, onClick }: BtnLoadDataProps) {
  return (
    <Button
      sx={styles.root}
      disabled={isDisabled}
      onClick={onClick}
      variant="outlined"
      color="primary"
      endIcon={<ChevronRight />}
    >
      Load Data
    </Button>
  );
}
