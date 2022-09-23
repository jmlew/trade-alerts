import { DashboardDataConfig, DashboardDataGridField } from '@kdb-dash/dashboard/domain';
import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';
import { DashboardGridMui } from '@kdb-dash/dashboard/ui/grids';
import { ErrorMessage } from '@kdb-dash/shared/ui-common';

import {
  getGridDataConfigs,
  getMuiGridConfigs,
} from '../entities/dashboard-grid-configs.util';
import { getGridData, normaliseMuiGridData } from '../entities/dashboard-grid-data.util';
import { DashboardGrid } from '../entities/dashboard-grid.enum';

interface GridContainerProps {
  grid: DashboardGrid;
}

export function GridContainer({ grid }: GridContainerProps) {
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
