import { AlertInfo, TradesInfo } from './dashboard-data.model';

export function getDashTradesLength(trades: TradesInfo[] | null): number {
  return trades != null ? trades.length : 0;
}

export function doAlertsExist(alerts: AlertInfo[] | null): boolean {
  return alerts != null && alerts.length > 0;
}
