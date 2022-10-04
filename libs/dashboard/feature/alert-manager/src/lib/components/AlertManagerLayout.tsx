import { Box, Typography } from '@mui/material';
import {
  dashItemBorderRadius,
  dashSectionBorder,
  themeColors,
} from '@trade-alerts/shared/ui-styles';

import { AlertManagerContainer } from '../containers/AlertManagerContainer';
import { AlertSelectorContainer } from '../containers/AlertSelectorContainer';

const styles = {
  root: {
    width: 600,
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

export function AlertManagerLayout() {
  return (
    <Box sx={styles.root}>
      <Typography sx={styles.title} variant="h5" color="primary.light">
        Update Alert
      </Typography>
      <Box sx={styles.selector}>
        <AlertSelectorContainer />
      </Box>
      <Box sx={styles.form}>
        <AlertManagerContainer />
      </Box>
    </Box>
  );
}
