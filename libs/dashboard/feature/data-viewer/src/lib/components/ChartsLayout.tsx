import {
  dashItemBorderRadius,
  dashItemPadding,
  dashSectionBorder,
  themeColors,
} from '@kdb-dash/shared/ui-styles';
import { Box, Typography } from '@mui/material';

import { TradesChartContainer } from '../containers/TradesChartContainer';
import { DashboardChart } from '../entities/dashboard-chart.enum';

const styles = {
  root: { width: 1, display: 'flex', flexDirection: 'row' },
  chartPanel: {
    width: 0.5,
    pt: 1,
    backgroundColor: themeColors.backgroundDark,
    ...dashSectionBorder,
    borderRadius: dashItemBorderRadius,
    '&:not(:first-of-type)': {
      ml: dashItemPadding,
    },
  },
  chart: { width: 1, height: 280, p: 1, overflow: 'hidden' },
};

export function ChartsLayout() {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.chartPanel}>
        <Typography align="center" color="primary.main">
          {DashboardChart.TradeValue}
        </Typography>
        <Box sx={styles.chart}>
          <TradesChartContainer chart={DashboardChart.TradeValue} />
        </Box>
      </Box>
      <Box sx={styles.chartPanel}>
        <Typography align="center" color="primary.main">
          {DashboardChart.TradeCount}
        </Typography>
        <Box sx={styles.chart}>
          <TradesChartContainer chart={DashboardChart.TradeCount} />
        </Box>
      </Box>
    </Box>
  );
}
