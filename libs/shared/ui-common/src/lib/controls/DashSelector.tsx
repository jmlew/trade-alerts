import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Theme,
} from '@mui/material';
import { UiControlOption } from '@trade-alerts/shared/data-access';

const styles = {
  root: { width: 1, height: 38 },
  label: { mb: 4 },
  select: (theme: Theme) => ({
    height: 1,
    '& .MuiSelect-icon': {
      color: theme.palette.primary.main,
    },
  }),
};

interface DashSelectorProps {
  options: UiControlOption[];
  value: string | number;
  label?: string;
  isDisabled?: boolean;
  onChange: (value: string | number) => void;
}

export function DashSelector({
  value,
  options,
  label,
  isDisabled,
  onChange,
}: DashSelectorProps) {
  function handleChange(event: SelectChangeEvent) {
    onChange(event.target.value);
  }

  return (
    <FormControl variant="standard" disabled={isDisabled} sx={styles.root}>
      {label != null && <InputLabel sx={styles.label}>{label}</InputLabel>}
      <Select sx={styles.select} value={value} onChange={handleChange} label={label}>
        {options.map((option: UiControlOption, index: number) => (
          <MenuItem key={index} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
