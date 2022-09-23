import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';
import { dashSectionBorder, themeColors } from '@kdb-dash/shared/ui-styles';
import { Box, Typography } from '@mui/material';

const styles = {
  root: {
    width: 1,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: themeColors.backgroundLight,
    ...dashSectionBorder,
    borderRight: 'none',
    borderLeft: 'none',
    px: 3,
    py: 2,
  },
  footerItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '&:not(:first-of-type)': {
      ml: 5,
    },
    color: 'primary.main',
  },
};

export function FooterLayout() {
  const { dashData } = useDashboardDataContext();
  return (
    <Box sx={styles.root}>
      <Box sx={styles.footerItem}>
        <Typography>UAM | 2,120,000</Typography>
      </Box>
      <Box sx={styles.footerItem}>
        <Typography>Total | 23,342,000</Typography>
      </Box>
    </Box>
  );
}
