import { DashboardGrid } from './dashboard-grid.enum';

export const gridLabels: Map<DashboardGrid, string> = new Map([
  [DashboardGrid.AlertInformation, 'Alert Information'],
  [DashboardGrid.AlertedTransactions, 'Alerted Transactions'],
  [DashboardGrid.AccountTransactions, 'Account Transactions'],
]);
