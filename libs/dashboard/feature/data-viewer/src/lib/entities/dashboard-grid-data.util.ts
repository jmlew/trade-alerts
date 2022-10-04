/**
 * Extends data items to include numeric ids based on their index.
 */

import {
  AccountsTransInfo,
  AlertInfo,
  AlertsTransInfo,
  DashboardDataGridField,
} from '@trade-alerts/dashboard/domain';

import { MuiGridData } from './dashboard-grid-data.model';
import { DashboardGrid } from './dashboard-grid.enum';

export function normaliseMuiGridData<T>(items: T[]): MuiGridData<T>[] {
  const startFrom: number = items.length;
  return items.map(
    (item: T, index: number) =>
      ('id' in item ? item : { ...item, id: startFrom + index }) as MuiGridData<T>
  );
}

export function getGridData(
  grid: DashboardGrid,
  data: {
    alerts: AlertInfo[] | null;
    alertsTrans: AlertsTransInfo[] | null;
    accountsTrans: AccountsTransInfo[] | null;
  }
): DashboardDataGridField[] | null {
  switch (grid) {
    case DashboardGrid.AlertInformation:
      return data.alerts;
    case DashboardGrid.AccountTransactions:
      return data.accountsTrans;
    case DashboardGrid.AlertedTransactions:
      return data.alertsTrans;
    default:
      return null;
  }
}
