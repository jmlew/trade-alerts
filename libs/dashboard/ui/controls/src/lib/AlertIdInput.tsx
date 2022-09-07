import { ChangeEvent } from 'react';

import { Box, TextField, Theme } from '@mui/material';

const styles = {
  root: (theme: Theme) => ({
    width: '50%',
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
  value: string;
  onSetValue: (value: string) => void;
}

export function AlertIdInput({ value, onSetValue }: AlertIdInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onSetValue(event.target.value);
  }

  return (
    <TextField
      id="alert-id"
      label="Alert ID"
      size="small"
      color="primary"
      sx={styles.root}
      value={value}
      onChange={handleChange}
    />
  );
}
