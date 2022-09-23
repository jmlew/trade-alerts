import {
  dashItemBorderRadius,
  dashSectionBorder,
  themeColors,
} from '@kdb-dash/shared/ui-styles';
import { Box, Typography } from '@mui/material';

import { AlertSelectorContainer } from '../containers/AlertSelectorContainer';
import { AlertUpdateFormContainer } from '../containers/AlertUpdateFormContainer';

const styles = {
  root: {
    width: 700,
    height: '100%',
    px: 4,
    py: 4,
    borderLeft: `1px solid ${themeColors.primary.dark}`,
    backgroundColor: themeColors.background,
  },
  title: {
    fontWeight: 'light',
  },
  selector: {
    mt: 6,
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

export function AlertUpdaterLayout() {
  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title} variant="h5" color="primary.light">
        Update Alerts
      </Typography>
      <Box sx={styles.selector}>
        <AlertSelectorContainer />
      </Box>
      <Box sx={styles.form}>
        <AlertUpdateFormContainer />
      </Box>
    </Box>
  );
}
