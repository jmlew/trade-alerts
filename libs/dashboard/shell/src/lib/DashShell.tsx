import { Theme, Typography } from '@mui/material';
import Box from '@mui/material/Box';

import { ShellContent } from './ShellContent';
import { ShellHeader } from './ShellHeader';

export const styles = {
  root: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  }),
};

export function DashShell() {
  return (
    <Box sx={styles.root}>
      <ShellHeader />
      <ShellContent>
        <Typography variant="h2" color="textPrimary">
          Dashboard content
        </Typography>
      </ShellContent>
    </Box>
  );
}
