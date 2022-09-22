import { TradeChartDataKeys } from '@kdb-dash/dashboard/ui/charts';

import { DashboardChart } from '../enum/DashboardChart.enum';

export function getChartDataKeys(chart: DashboardChart): TradeChartDataKeys {
  switch (chart) {
    case DashboardChart.TradeCount:
      return {
        dataKeyX: 'date',
        dataKeyYA: 'countBuy',
        dataKeyYB: 'countSell',
      };
    case DashboardChart.TradeValue:
    default:
      return {
        dataKeyX: 'date',
        dataKeyYA: 'valueBuy',
        dataKeyYB: 'valueSell',
      };
  }
}
