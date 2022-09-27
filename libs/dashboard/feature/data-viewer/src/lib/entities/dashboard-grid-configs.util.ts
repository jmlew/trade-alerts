import { ColDef } from 'ag-grid-community';

import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import {
  DashboardDataConfig,
  DashboardDataGridField,
  accountsTransConfigs,
  alertInfoConfigs,
  alertsTransConfigs,
} from '@trade-alerts/dashboard/domain';

import { DashboardGrid } from './dashboard-grid.enum';

/**
 * Returns the data configs to apply to a given grid.
 */
export function getGridDataConfigs(grid: DashboardGrid): DashboardDataConfig[] {
  switch (grid) {
    case DashboardGrid.AlertInformation:
      return alertInfoConfigs;
    case DashboardGrid.AccountTransactions:
      return accountsTransConfigs;
    case DashboardGrid.AlertedTransactions:
      return alertsTransConfigs;
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
  return configs.map((item) => {
    return {
      ...item,
      valueGetter: item.valueMap ? muiValueGetter(item.valueMap) : undefined,
    };
  });
}

function muiValueGetter(
  valueMap: Map<any, string>
): (params: GridValueGetterParams<any, DashboardDataGridField>) => string {
  return (params: GridValueGetterParams) => valueMap.get(params.value) || params.value;
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
