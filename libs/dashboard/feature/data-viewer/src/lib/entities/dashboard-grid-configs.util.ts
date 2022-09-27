import { ColDef } from 'ag-grid-community';

import { GridColDef } from '@mui/x-data-grid';
import {
  DashboardDataConfig,
  DashboardDataGridField,
  accountsTransConfigs,
  alertInfoConfigs,
  alertsTransConfigs,
} from '@trade-alerts/dashboard/domain';
import { muiCellRenderer, muiCellValueGetter } from '@trade-alerts/dashboard/ui/grids';

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
 * Transforms the given generic configs into a format which can be used by the MUI
 * data grid column definitions.
 */
export function getMuiGridConfigs(
  configs: DashboardDataConfig[]
): GridColDef<DashboardDataGridField>[] {
  return configs.map((item) => {
    return {
      ...item,
      valueGetter: item.valueMap != null ? muiCellValueGetter(item.valueMap) : undefined,
      renderCell:
        item.cellRenderType != null ? muiCellRenderer(item.cellRenderType) : undefined,
    };
  });
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
