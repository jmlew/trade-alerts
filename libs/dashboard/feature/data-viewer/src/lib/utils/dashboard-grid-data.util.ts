/**
 * Extends data items to include numeric ids based on their index.
 */

import { DashboardData, DashboardDataGridField } from '@kdb-dash/dashboard/domain';

import { DashboardGrid } from '../enum/dashboard-grid.enum';
import { MuiGridData } from './dashboard-grid-data.model';

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
      return dashData?.alerts || null;
    case DashboardGrid.AccountTransactions:
      return dashData?.accountsTrans || null;
    case DashboardGrid.AlertedTransactions:
      return dashData?.alertsTrans || null;
    default:
      return null;
  }
}
