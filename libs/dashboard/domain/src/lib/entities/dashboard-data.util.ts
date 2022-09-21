import { AlertInfo, DashboardData } from './dashboard-data.model';

export function doAlertsExist(dashData: DashboardData): boolean {
  const alerts: AlertInfo[] | null = dashData?.alerts || null;
  return alerts != null && alerts.length > 0;
}
