import {
  dashItemBorderRadius,
  dashItemPadding,
  dashSectionBorder,
  themeColors,
} from '@kdb-dash/shared/ui-styles';
import { Box, Typography } from '@mui/material';

import { DashboardChartContainer } from '../containers/TradesChartContainer';
import { DashboardChart } from '../enum/DashboardChart.enum';

const styles = {
  root: { width: 1, display: 'flex', flexDirection: 'row' },
  chartPanel: {
    width: 0.5,
    backgroundColor: themeColors.backgroundDark,
    ...dashSectionBorder,
    borderRadius: dashItemBorderRadius,
    '&:not(:first-of-type)': {
      ml: dashItemPadding,
    },
  },
  chart: { width: 1, p: 2, color: 'primary.main', overflow: 'hidden' },
};

export function DashChartsLayout() {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.chartPanel}>
        <Box sx={styles.chart}>
          <Typography align="center">{DashboardChart.TradeValue}</Typography>
          {/* <JsonViewer data={trades} sx={{ width: 0.8 }} /> */}
          <DashboardChartContainer chart={DashboardChart.TradeValue} />
        </Box>
      </Box>
      <Box sx={styles.chartPanel}>
        <Box sx={styles.chart}>
          <Typography align="center">{DashboardChart.TradeCount}</Typography>
          {/* <JsonViewer data={trades} sx={{ width: 0.8 }} /> */}
          <DashboardChartContainer chart={DashboardChart.TradeCount} />
        </Box>
      </Box>
    </Box>
  );
}
