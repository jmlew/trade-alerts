import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';
import { JsonViewer } from '@kdb-dash/shared/ui-common';
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
  chart: { width: 1, height: 300, p: 2, color: 'primary.main', overflow: 'hidden' },
};

export function DashChartsLayout() {
  const { dashData } = useDashboardDataContext();
  if (dashData == null) {
    return null;
  }
  const { trades } = dashData;

  return (
    <Box sx={styles.root}>
      <Box sx={styles.chartPanel}>
        <Box sx={styles.chart}>
          <Typography align="center">Trade Values</Typography>
          <JsonViewer data={trades} sx={{ width: 0.8 }} />
        </Box>
      </Box>
      <Box sx={styles.chartPanel}>
        <Box sx={styles.chart}>
          <Typography align="center">Trades Count</Typography>
          <JsonViewer data={trades} sx={{ width: 0.8 }} />
        </Box>
      </Box>
    </Box>
  );
}
