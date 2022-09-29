import { useState } from 'react';

import { ScreenRotation } from '@mui/icons-material';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { getDashTrades, getDashTradesLength } from '@trade-alerts/dashboard/domain';
import { useDashboardDataContext } from '@trade-alerts/dashboard/feature/data-provider';
import {
  dashItemBorderRadius,
  dashItemPadding,
  dashSectionBorder,
  themeColors,
} from '@trade-alerts/shared/ui-styles';

import { TradesChartContainer } from '../containers/TradesChartContainer';
import { ChartAxis, DashboardChart } from '../entities/dashboard-chart.enum';
import { getInitialChartAxis } from '../entities/dashboard-chart.util';

const styles = {
  root: (axis: ChartAxis) => ({
    width: 1,
    display: 'flex',
    flexDirection: axis === ChartAxis.Horizontal ? 'row' : 'column',
  }),
  chartPanel: (axis: ChartAxis) => ({
    width: axis === ChartAxis.Horizontal ? 0.5 : 1,
    pt: 1,
    backgroundColor: themeColors.backgroundDark,
    ...dashSectionBorder,
    borderRadius: dashItemBorderRadius,
    '&:not(:first-of-type)': {
      ml: axis === ChartAxis.Horizontal ? dashItemPadding : 0,
      mt: axis === ChartAxis.Vertical ? dashItemPadding : 0,
    },
  }),
  chart: { width: 1, height: 280, p: 1, overflow: 'hidden' },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    px: 1,
  },
  headerBtn: {
    justifyContent: 'flex-end',
    color: 'primary.dark',
  },
  headerTitle: {
    justifyContent: 'center',
    flexGrow: 1,
  },
};

export function ChartsLayout() {
  // TODO: Move the reference to trades length to container.
  const { dashData } = useDashboardDataContext();
  const [axis, setAxis] = useState(getInitialChartAxis(getDashTradesLength(dashData)));

  function handleToggleAxis() {
    const updated: ChartAxis =
      axis === ChartAxis.Horizontal ? ChartAxis.Vertical : ChartAxis.Horizontal;
    setAxis(updated);
  }

  return (
    <Box sx={styles.root(axis)}>
      <Box sx={styles.chartPanel(axis)}>
        <ChartHeader
          chart={DashboardChart.TradeValue}
          axis={axis}
          onClick={handleToggleAxis}
        />
        <Box sx={styles.chart}>
          <TradesChartContainer chart={DashboardChart.TradeValue} />
        </Box>
      </Box>
      <Box sx={styles.chartPanel(axis)}>
        <ChartHeader
          chart={DashboardChart.TradeCount}
          axis={axis}
          onClick={handleToggleAxis}
        />
        <Box sx={styles.chart}>
          <TradesChartContainer chart={DashboardChart.TradeCount} />
        </Box>
      </Box>
    </Box>
  );
}

interface ChartHeaderProps {
  chart: DashboardChart;
  axis: ChartAxis;
  onClick: () => void;
}
function ChartHeader({ chart, axis, onClick }: ChartHeaderProps) {
  const transform = axis === ChartAxis.Vertical ? 'rotate(135deg)' : 'rotate(45deg)';
  const tooltip = `Align charts ${
    axis === ChartAxis.Horizontal ? 'vertically' : 'horizontally'
  }`;
  return (
    <Box sx={styles.header}>
      <Typography align="center" color="primary.main" sx={styles.headerTitle}>
        {chart}
      </Typography>
      <Tooltip title={tooltip} arrow>
        <IconButton size="small" onClick={onClick} sx={styles.headerBtn}>
          <ScreenRotation
            fontSize="small"
            sx={{ transform, transition: 'transform 150ms ease-out' }}
          />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
