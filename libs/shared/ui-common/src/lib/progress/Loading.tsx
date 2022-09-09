import { Box, CircularProgress, Theme, Typography } from '@mui/material';

const styles = {
  root: (theme: Theme) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
};

interface LoadingProps {
  message?: string;
}

export function Loading({ message }: LoadingProps) {
  return (
    <Box sx={styles.root}>
      {!!message && (
        <Typography variant="body1" mr={2} color="primary.dark">
          {message}
        </Typography>
      )}
      <CircularProgress />
    </Box>
  );
}
