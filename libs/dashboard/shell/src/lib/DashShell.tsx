import { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { AlertManagerLayout } from '@trade-alerts/dashboard/feature/alert-manager';
import {
  AlertManagerDrawer,
  AlertManagerDrawerProvider,
} from '@trade-alerts/dashboard/feature/alert-manager-drawer';
import { DashboardDataProvider } from '@trade-alerts/dashboard/feature/data-provider';
import { DataViewerContainer } from '@trade-alerts/dashboard/feature/data-viewer';

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
        <AlertManagerDrawerProvider>
          <DashHeaderLayout />
          <DashContentLayout>
            <DataViewerContainer isErrorAlertsShown={true} />
          </DashContentLayout>
          <AlertManagerDrawer>
            {/* TODO: move content to new domain */}
            <AlertManagerLayout />
          </AlertManagerDrawer>
        </AlertManagerDrawerProvider>
      </DashboardDataProvider>
    </Box>
  );
}
