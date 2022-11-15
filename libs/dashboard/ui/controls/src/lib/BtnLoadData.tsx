import { ChevronRight } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

const styles = {
  root: { whiteSpace: 'nowrap' },
};

interface BtnLoadDataProps {
  isLoading?: boolean;
  onClick: () => void;
}

export function BtnLoadData({ isLoading, onClick }: BtnLoadDataProps) {
  return (
    <LoadingButton
      sx={styles.root}
      loading={isLoading}
      onClick={onClick}
      variant="outlined"
      color="primary"
      loadingPosition="end"
      endIcon={<ChevronRight />}
      aria-label="load dashboard data"
    >
      Load Data
    </LoadingButton>
  );
}
