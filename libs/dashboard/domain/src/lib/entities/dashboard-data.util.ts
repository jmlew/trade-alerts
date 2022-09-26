import { AlertInfoField } from './dashboard-data-fields.enum';
import { AlertInfo, DashboardData } from './dashboard-data.model';

export function doAlertsExist(dashData: DashboardData): boolean {
  const alerts: AlertInfo[] | null = dashData?.alerts || null;
  return alerts != null && alerts.length > 0;
}

export function getAlertById(alerts: AlertInfo[], id: string | number): AlertInfo | null {
  return alerts.find((item: AlertInfo) => item[AlertInfoField.AlertId] === id) || null;
}
