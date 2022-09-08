import { ChangeEvent } from 'react';

import { TextField, Theme } from '@mui/material';

const styles = {
  root: (theme: Theme) => ({
    width: 1,
    color: 'primary.main',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'primary.dark',
    },
    '&:hover, &.Mui-focusVisible': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'primary.main',
      },
    },
    '& .MuiFormLabel-root': { color: 'primary.main' },
  }),
};

interface AlertIdInputProps {
  value: number | null;
  onSetValue: (value: number | null) => void;
}

export function AlertIdInput({ value, onSetValue }: AlertIdInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const validated: string = event.target.value.replace(/[^0-9]/g, '');

    if (validated === '') {
      onSetValue(null);
      return;
    }
    if (isNaN(Number(validated))) {
      event.preventDefault();
      return;
    }
    onSetValue(Number(validated));
  }

  return (
    <TextField
      id="alert-id"
      label="Alert ID"
      size="small"
      color="primary"
      sx={styles.root}
      value={value == null ? '' : value}
      onChange={handleChange}
    />
  );
}
