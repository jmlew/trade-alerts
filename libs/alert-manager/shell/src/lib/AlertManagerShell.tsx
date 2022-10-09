import { Box } from '@mui/material';
import {
  ManageAlertsLayout,
  ManageAlertsProvider,
} from '@trade-alerts/alert-manager/feature/manage-alerts';
import { themeColors } from '@trade-alerts/shared/ui-styles';

const styles = {
  root: {
    width: 600,
    height: '100%',
    px: 4,
    py: 4,
    borderLeft: `1px solid ${themeColors.primary.dark}`,
    backgroundColor: themeColors.background,
  },
};

export function AlertManagerShell() {
  return (
    <Box sx={styles.root}>
      <ManageAlertsProvider>
        <ManageAlertsLayout />
      </ManageAlertsProvider>
    </Box>
  );
}
