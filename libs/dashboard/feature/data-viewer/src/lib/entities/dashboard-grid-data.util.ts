/**
 * Extends data items to include numeric ids based on their index.
 */

import {
  DashboardData,
  DashboardDataGridField,
  getDashAccountsTrans,
  getDashAlerts,
  getDashAlertsTrans,
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
  dashData: DashboardData | undefined
): DashboardDataGridField[] | null {
  switch (grid) {
    case DashboardGrid.AlertInformation:
      return getDashAlerts(dashData);
    case DashboardGrid.AccountTransactions:
      return getDashAccountsTrans(dashData);
    case DashboardGrid.AlertedTransactions:
      return getDashAlertsTrans(dashData);
    default:
      return null;
  }
}
