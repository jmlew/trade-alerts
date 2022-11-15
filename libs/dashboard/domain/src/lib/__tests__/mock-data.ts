import { dashboard } from '@trade-alerts/mocks';
import { Entity, createEntities } from '@trade-alerts/shared/util-common';

import {
  AccountsTransInfo,
  AlertInfo,
  AlertsTransInfo,
  DashboardApiData,
  DashboardData,
  TradesInfo,
} from '../entities/dashboard-data.model';

function getSampleData<T>(items: T[]) {
  return items.filter((item: T, index: number) => index < 2);
}

const mockAlerts: AlertInfo[] = getSampleData(dashboard.alerts);
const mockAlertEntities: Entity<AlertInfo> = createEntities(mockAlerts, 'alertID');
const mockTrades: TradesInfo[] = getSampleData(dashboard.trades);
const mockAlertsTrans: AlertsTransInfo[] = getSampleData(dashboard.alertsTrans);
const mockAccountsTrans: AccountsTransInfo[] = getSampleData(dashboard.accountsTrans);
const mockDashboardData: DashboardData = {
  alerts: mockAlertEntities,
  trades: mockTrades,
  alertsTrans: mockAlertsTrans,
  accountsTrans: mockAccountsTrans,
};
const mockDashboardApiData: DashboardApiData = {
  alerts: mockAlerts,
  trades: mockTrades,
  alertsTrans: mockAlertsTrans,
  accountsTrans: mockAccountsTrans,
};

export {
  mockAlerts,
  mockAlertEntities,
  mockTrades,
  mockAlertsTrans,
  mockAccountsTrans,
  mockDashboardData,
  mockDashboardApiData,
};
