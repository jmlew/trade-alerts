import { AlertInfoField } from './dashboard-data-fields.enum';
import {
  AccountsTransInfo,
  AlertInfo,
  AlertUpdateParams,
  AlertsTransInfo,
  DashboardData,
  TradesInfo,
} from './dashboard-data.model';

export function getDashAlerts(
  dashData: DashboardData | undefined | null
): AlertInfo[] | null {
  return dashData?.alerts || null;
}

export function getDashTrades(
  dashData: DashboardData | undefined | null
): TradesInfo[] | null {
  return dashData?.trades || null;
}

export function getDashTradesLength(dashData: DashboardData | undefined | null): number {
  const trades = getDashTrades(dashData);
  return trades != null ? trades.length : 0;
}

export function getDashAlertsTrans(
  dashData: DashboardData | undefined | null
): AlertsTransInfo[] | null {
  return dashData?.alertsTrans || null;
}

export function getDashAccountsTrans(
  dashData: DashboardData | undefined | null
): AccountsTransInfo[] | null {
  return dashData?.accountsTrans || null;
}

export function doAlertsExist(dashData: DashboardData): boolean {
  const alerts: AlertInfo[] | null = getDashAlerts(dashData);
  return alerts != null && alerts.length > 0;
}

export function getAlertId(alert: AlertInfo): number {
  return alert[AlertInfoField.AlertId];
}

export function getAlertById(alerts: AlertInfo[], id: number): AlertInfo | null {
  return alerts.find((item: AlertInfo) => getAlertId(item) === id) || null;
}

export function mergeAlertUpdates(
  alerts: AlertInfo[],
  id: number,
  updates: AlertUpdateParams
): AlertInfo[] {
  return alerts.map((alert: AlertInfo) =>
    getAlertId(alert) === id ? { ...alert, status: updates.status } : alert
  );
}
