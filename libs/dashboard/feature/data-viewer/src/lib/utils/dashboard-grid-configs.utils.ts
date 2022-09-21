import { ColDef } from 'ag-grid-community';

import {
  DashboardDataConfig,
  DashboardDataGridField,
  alertInfoConfigs,
  transactionConfigs,
} from '@kdb-dash/dashboard/domain';
import { GridColDef } from '@mui/x-data-grid';

import { DashboardGrid } from '../enum/DashboardGrid.enum';

/**
 * Returns the data configs to apply to a given grid.
 */
export function getGridDataConfigs(grid: DashboardGrid): DashboardDataConfig[] {
  switch (grid) {
    case DashboardGrid.AlertInformation:
      return alertInfoConfigs;
    case DashboardGrid.AccountTransactions:
    case DashboardGrid.AlertedTransactions:
    default:
      return transactionConfigs;
  }
}

/**
 * Placeholder util to be filled in when the need to switch between different data grids
 * requires transforming the generic configs into a format which can be used by the MUI
 * data grid column definitions.
 */
export function getMuiGridConfigs(
  configs: DashboardDataConfig[]
): GridColDef<DashboardDataGridField>[] {
  return configs as GridColDef<DashboardDataGridField>[];
}

/**
 * Placeholder util to be filled in when the need to switch between different data grids
 * requires transforming the generic configs into a format which can be used by the Ag Grid
 * data grid column definitions.
 */
export function getAgGridConfigs(
  configs: DashboardDataConfig[]
): ColDef<DashboardDataGridField>[] {
  return configs as ColDef<DashboardDataGridField>[];
}
