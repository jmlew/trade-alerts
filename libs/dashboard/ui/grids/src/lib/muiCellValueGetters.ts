import { GridValueGetterParams } from '@mui/x-data-grid';
import { DashboardDataGridField } from '@trade-alerts/dashboard/domain';

export function muiCellValueGetter(
  valueMap: Map<any, string>
): (params: GridValueGetterParams<any, DashboardDataGridField>) => string {
  return (params: GridValueGetterParams) => valueMap.get(params.value) || params.value;
}
