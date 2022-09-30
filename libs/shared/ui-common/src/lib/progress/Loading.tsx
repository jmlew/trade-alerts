import { Box, CircularProgress, Typography } from '@mui/material';

const styles = {
  root: (top?: number) => ({
    pt: top ?? 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
};

interface LoadingProps {
  message?: string;
  top?: number;
}

export function Loading({ message, top }: LoadingProps) {
  return (
    <Box sx={styles.root(top)}>
      {!!message && (
        <Typography variant="body1" mr={2} color="primary.dark">
          {message}
        </Typography>
      )}
      <CircularProgress />
    </Box>
  );
}
