import {
  AlertUpdaterDrawer,
  AlertUpdaterProvider,
} from '@kdb-dash/dashboard/feature/alert-updater';
import { DashboardDataProvider } from '@kdb-dash/dashboard/feature/data-provider';
import { DataViewerContainer } from '@kdb-dash/dashboard/feature/data-viewer';
import { Theme } from '@mui/material';
import Box from '@mui/material/Box';

import { DashContentLayout } from './DashContentLayout';
import { DashHeaderLayout } from './DashHeaderLayout';

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
      <DashboardDataProvider>
        <AlertUpdaterProvider>
          <DashHeaderLayout />
          <DashContentLayout>
            <DataViewerContainer isErrorAlertsShown={true} />
          </DashContentLayout>
          <AlertUpdaterDrawer />
        </AlertUpdaterProvider>
      </DashboardDataProvider>
    </Box>
  );
}
