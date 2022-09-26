import { TradesInfo } from '@trade-alerts/dashboard/domain';
import { themeColors } from '@trade-alerts/shared/ui-styles';

export enum ChartAttribute {
  Grid,
  ValueA,
  ValueB,
  Average,
}

export const chartColors: Map<ChartAttribute, string> = new Map([
  [ChartAttribute.ValueA, '#FFB72C'],
  [ChartAttribute.ValueB, '#85C8FF'],
  [ChartAttribute.Average, 'grey'],
  [ChartAttribute.Grid, themeColors.backgroundLight],
]);

export const chartLabels: Map<keyof TradesInfo, string> = new Map([
  ['valueBuy', 'Buy Value'],
  ['valueSell', 'Sell Value'],
  ['countBuy', 'Buy Count'],
  ['countSell', 'Sell Count'],
]);
