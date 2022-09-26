import { useDashboardDataContext } from '@trade-alerts/dashboard/feature/data-provider';
import { TradesChart } from '@trade-alerts/dashboard/ui/charts';
import { ErrorMessage } from '@trade-alerts/shared/ui-common';

import { DashboardChart } from '../entities/dashboard-chart.enum';
import { getChartDataKeys } from '../entities/dashboard-chart.util';

interface TradesChartContainerProps {
  chart: DashboardChart;
}

export function TradesChartContainer({ chart }: TradesChartContainerProps) {
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
