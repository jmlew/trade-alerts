import { useDashboardDataContext } from '@kdb-dash/dashboard/domain';
import {
  dashItemBorderRadius,
  dashItemPadding,
  dashSectionBorder,
  themeColors,
} from '@kdb-dash/shared/ui-styles';
import { Box, Typography } from '@mui/material';

const styles = {
  root: { width: 1, height: 1, display: 'flex', flexDirection: 'row' },
  chartPanel: {
    width: 0.5,
    backgroundColor: themeColors.backgroundDark,
    ...dashSectionBorder,
    borderRadius: dashItemBorderRadius,
    '&:not(:first-of-type)': {
      ml: dashItemPadding,
    },
  },
  chart: { width: 1, height: 300, p: 2, color: 'primary.main' },
};

export function DashChartsLayout() {
  const { dashData } = useDashboardDataContext();
  return (
    <Box sx={styles.root}>
      <Box sx={styles.chartPanel}>
        <Box sx={styles.chart}>
          <Typography>Chart A here</Typography>
        </Box>
      </Box>
      <Box sx={styles.chartPanel}>
        <Box sx={styles.chart}>
          <Typography>Chart B here</Typography>
        </Box>
      </Box>
    </Box>
  );
}
