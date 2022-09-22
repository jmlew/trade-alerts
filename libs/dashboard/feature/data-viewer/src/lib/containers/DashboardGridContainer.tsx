import { DashboardDataConfig, DashboardDataGridField } from '@kdb-dash/dashboard/domain';
import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';
import { DashboardGridMui } from '@kdb-dash/dashboard/ui/grids';
import { ErrorMessage } from '@kdb-dash/shared/ui-common';

import { DashboardGrid } from '../enum/dashboard-grid.enum';
import {
  getGridDataConfigs,
  getMuiGridConfigs,
} from '../utils/dashboard-grid-configs.utils';
import { getGridData, normaliseMuiGridData } from '../utils/dashboard-grid-data.util';

interface DashboardGridContainerProps {
  grid: DashboardGrid;
}

export function DashboardGridContainer({ grid }: DashboardGridContainerProps) {
  const { dashData } = useDashboardDataContext();
  const data: DashboardDataGridField[] | null = getGridData(grid, dashData);
  const configs: DashboardDataConfig[] = getGridDataConfigs(grid);

  return data != null ? (
    <DashboardGridMui
      data={normaliseMuiGridData<DashboardDataGridField>(data)}
      configs={getMuiGridConfigs(configs)}
    />
  ) : (
    <ErrorMessage>Can't get {grid} data</ErrorMessage>
  );
}
