import { ColDef } from 'ag-grid-community';

import { DashboardDataConfig, DashboardDataGridField } from '@kdb-dash/dashboard/domain';
import { GridColDef } from '@mui/x-data-grid';

/**
 * Placeholder util to be filled in when the need to switch between different data grids
 * requires transforming the generic configs into a format which can be used by the MUI
 * data grid column definitions.
 */
export function getTransactionConfigsMui(
  configs: DashboardDataConfig[]
): GridColDef<DashboardDataGridField>[] {
  return configs as GridColDef<DashboardDataGridField>[];
}

/**
 * Placeholder util to be filled in when the need to switch between different data grids
 * requires transforming the generic configs into a format which can be used by the Ag Grid
 * data grid column definitions.
 */
export function getTransactionConfigsAgGrid(
  configs: DashboardDataConfig[]
): ColDef<DashboardDataGridField>[] {
  return configs as ColDef<DashboardDataGridField>[];
}
