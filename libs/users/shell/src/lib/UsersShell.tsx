import { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { UsersRoutes } from '@trade-alerts/users/feature/manage-users';

import { ShellContent } from './ShellContent';
import { ShellFooter } from './ShellFooter';
import { ShellHeader } from './ShellHeader';

export const styles = {
  root: (theme: Theme) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  }),
};

export function UsersShell() {
  return (
    <Box sx={styles.root}>
      <ShellHeader />
      <ShellContent>
        <UsersRoutes />
      </ShellContent>
      <ShellFooter />
    </Box>
  );
}
