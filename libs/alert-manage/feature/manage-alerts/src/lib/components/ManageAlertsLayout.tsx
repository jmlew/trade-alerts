import { Box, Typography } from '@mui/material';
import {
  dashItemBorderRadius,
  dashSectionBorder,
  themeColors,
} from '@trade-alerts/shared/ui-styles';

import { AlertSelectorContainer } from '../containers/AlertSelectorContainer';
import { UpdateAlertsContainer } from '../containers/UpdateAlertsContainer';

const styles = {
  root: {
    width: 1,
  },
  title: {
    fontWeight: 'light',
  },
  selector: {
    mt: 5,
  },
  form: {
    mt: 7,
    py: 3,
    px: 3,
    color: 'primary.main',
    ...dashSectionBorder,
    borderRadius: dashItemBorderRadius,
    backgroundColor: themeColors.backgroundDark,
  },
};

export function ManageAlertsLayout() {
  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title} variant="h5" color="primary.light">
        Update Alert
      </Typography>
      <Box sx={styles.selector}>
        <AlertSelectorContainer />
      </Box>
      <Box sx={styles.form}>
        <UpdateAlertsContainer />
      </Box>
    </Box>
  );
}
