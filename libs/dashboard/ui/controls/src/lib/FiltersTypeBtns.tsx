import { Button, ButtonGroup, Theme } from '@mui/material';
import { FiltersType } from '@trade-alerts/dashboard/domain';

const styles = {
  root: (theme: Theme) => ({ width: 1 }),
  btn: { whiteSpace: 'nowrap' },
};

interface FiltersTypeBtnsProps {
  type: FiltersType;
  onSetType: (type: FiltersType) => void;
}

export function FiltersTypeBtns({ type, onSetType }: FiltersTypeBtnsProps) {
  return (
    <ButtonGroup variant="outlined" aria-label="outlined button group">
      <Button
        variant={type === FiltersType.DateRange ? 'contained' : 'outlined'}
        sx={styles.btn}
        onClick={() => onSetType(FiltersType.DateRange)}
      >
        By Date
      </Button>
      <Button
        variant={type === FiltersType.AlertId ? 'contained' : 'outlined'}
        sx={styles.btn}
        onClick={() => onSetType(FiltersType.AlertId)}
      >
        By ID
      </Button>
    </ButtonGroup>
  );
}
