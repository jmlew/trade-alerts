import { DateTime } from 'luxon';

import { ChevronRight } from '@mui/icons-material';
import { Box, TextField, Theme } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { getDateTimeToMills } from '@trade-alerts/shared/util-common';
import { DateRange } from '@trade-alerts/shared/util-filters';

const styles = {
  root: {
    width: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: { width: 180 },
  input: (theme: Theme) => ({
    height: 38,
    width: 180,
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.dark',
    },
    '&:hover, &.Mui-focusVisible': {
      '& .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main' },
    },
    '& .MuiButtonBase-root': { color: 'primary.dark' },
    '& .MuiFormLabel-root': { color: 'primary.dark' },
  }),
  icon: { mx: 0.5, color: 'primary.dark' },
};

interface DateRangeInputsProps {
  dateRange: DateRange;
  defaultDateRange: DateRange;
  onSetDateRange: (dateRange: DateRange) => void;
}

export function DateRangeInputs({
  dateRange,
  defaultDateRange,
  onSetDateRange,
}: DateRangeInputsProps) {
  function handleChangeFrom(value: DateTime) {
    const from: number = value ? getDateTimeToMills(value) : defaultDateRange.from;
    onSetDateRange({ ...dateRange, from });
  }

  function handleChangeTo(value: DateTime) {
    const to: number = value ? getDateTimeToMills(value) : defaultDateRange.to;
    onSetDateRange({ ...dateRange, to });
  }

  const fromInput: DateTime = DateTime.fromMillis(dateRange.from);
  const toInput: DateTime = DateTime.fromMillis(dateRange.to);
  const dateTimeFormat = 'dd LLL yyyy';

  return (
    <Box sx={styles.root}>
      <Box sx={styles.picker}>
        <DesktopDatePicker
          label="From"
          inputFormat={dateTimeFormat}
          value={fromInput}
          onChange={handleChangeFrom}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              sx={styles.input}
              aria-label="enter date from"
            />
          )}
          disableMaskedInput
        />
      </Box>
      <ChevronRight sx={styles.icon} />
      <Box sx={styles.picker}>
        <DesktopDatePicker
          label="To"
          inputFormat={dateTimeFormat}
          value={toInput}
          onChange={handleChangeTo}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              sx={styles.input}
              aria-label="enter date to"
            />
          )}
          disableMaskedInput
        />
      </Box>
    </Box>
  );
}
