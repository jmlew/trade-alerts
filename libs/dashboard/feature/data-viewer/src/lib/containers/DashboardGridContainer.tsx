import { DashboardDataGridField, alertInfoConfigs } from '@kdb-dash/dashboard/domain';
import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';
import { DashboardGridMui } from '@kdb-dash/dashboard/ui/grids';
import { ErrorMessage } from '@kdb-dash/shared/ui-common';

import { DashboardGrid } from '../enum/DashboardGrid.enum';
import { getTransactionConfigsMui } from '../utils/dashboard-grid-configs.utils';
import { getGridData, normaliseMuiGridData } from '../utils/dashboard-grid-data.util';

interface DashboardGridContainerProps {
  grid: DashboardGrid;
}

export function DashboardGridContainer({ grid }: DashboardGridContainerProps) {
  const { dashData } = useDashboardDataContext();
  const data: DashboardDataGridField[] | null = getGridData(grid, dashData);
  console.log('data', data);

  return data != null ? (
    <DashboardGridMui
      data={normaliseMuiGridData<DashboardDataGridField>(data)}
      configs={getTransactionConfigsMui(alertInfoConfigs)}
    />
  ) : (
    <ErrorMessage>Can't get {grid} data</ErrorMessage>
  );
}
