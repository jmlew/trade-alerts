import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';
import { TradesChart } from '@kdb-dash/dashboard/ui/charts';
import { ErrorMessage } from '@kdb-dash/shared/ui-common';

import { DashboardChart } from '../enum/DashboardChart.enum';
import { getChartDataKeys } from '../utils/dashboard-chart.util';

interface DashboardGridContainerProps {
  chart: DashboardChart;
}

export function DashboardChartContainer({ chart }: DashboardGridContainerProps) {
  const { dashData } = useDashboardDataContext();
  if (dashData == null) {
    return null;
  }
  const { trades } = dashData;

  return trades != null ? (
    <TradesChart data={trades} dataKeys={getChartDataKeys(chart)} />
  ) : (
    <ErrorMessage>Can't get {chart} data</ErrorMessage>
  );
}
