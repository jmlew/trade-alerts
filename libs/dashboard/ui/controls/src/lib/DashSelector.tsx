import { UiControlOption } from '@kdb-dash/shared/data-access';
import { FormControl, MenuItem, Select, SelectChangeEvent, Theme } from '@mui/material';

const styles = {
  root: { width: '25%', minWidth: 200, height: 38 },
  select: (theme: Theme) => ({
    height: 1,

    '& .MuiSelect-icon': {
      color: theme.palette.primary.main,
    },
  }),
};

interface DashSelectorProps {
  options: UiControlOption[];
  value: string;
  setValue: (value: string) => void;
}

export function DashSelector({ value, options, setValue }: DashSelectorProps) {
  function handleChange(event: SelectChangeEvent<string>) {
    setValue(event.target.value);
  }

  return (
    <FormControl variant="standard" sx={styles.root}>
      <Select sx={styles.select} value={value} onChange={handleChange}>
        {options.map((option: UiControlOption) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
