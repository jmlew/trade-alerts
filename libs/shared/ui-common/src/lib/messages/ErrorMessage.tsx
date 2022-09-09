import { ReactNode } from 'react';

import { Theme, Typography } from '@mui/material';

const styles = {
  root: (theme: Theme) => ({}),
};

interface ErrorMessageProps {
  children: ReactNode;
}

export function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <Typography sx={styles.root} variant="body1" mr={2} color="warning.main">
      {children}
    </Typography>
  );
}
