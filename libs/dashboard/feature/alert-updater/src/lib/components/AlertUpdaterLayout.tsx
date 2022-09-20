import { themeColors } from '@kdb-dash/shared/ui-styles';
import { Box, Typography } from '@mui/material';

const styles = {
  root: {
    width: 400,
    height: '100%',
    textAlign: 'center',
    p: 4,
    backgroundColor: themeColors.backgroundLight,
    color: 'primary.main',
    borderLeft: `1px solid ${themeColors.primary.dark}`,
  },
};

export function AlertUpdaterLayout() {
  return (
    <Box sx={styles.root}>
      <Typography>(Update Alerts Feature)</Typography>
    </Box>
  );
}
