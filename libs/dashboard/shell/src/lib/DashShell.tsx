import {
  DashboardDataProvider,
  DataViewerContainer,
} from '@kdb-dash/dashboard/feature/data-viewer';
import { Theme } from '@mui/material';
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
        <DashboardDataProvider>
          <DataViewerContainer isErrorAlertsShown={true} />
        </DashboardDataProvider>
      </ShellContent>
    </Box>
  );
}
