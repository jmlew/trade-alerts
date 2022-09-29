import { AlertInfoField } from './dashboard-data-fields.enum';
import { AlertInfo, AlertUpdateParams, DashboardData } from './dashboard-data.model';

export function doAlertsExist(dashData: DashboardData): boolean {
  const alerts: AlertInfo[] | null = dashData?.alerts || null;
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
