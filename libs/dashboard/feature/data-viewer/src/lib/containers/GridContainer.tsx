import {
  AlertInfoField,
  DashboardDataConfig,
  DashboardDataGridField,
  alertManagerFacade,
} from '@trade-alerts/dashboard/domain';
import { useAlertManagerDrawerContext } from '@trade-alerts/dashboard/feature/alert-manager-drawer';
import { useDashboardDataContext } from '@trade-alerts/dashboard/feature/data-provider';
import { DashboardGridMui } from '@trade-alerts/dashboard/ui/grids';
import { ErrorMessage } from '@trade-alerts/shared/ui-common';

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
  const { alerts, alertsTrans, accountsTrans } = useDashboardDataContext();
  const { setDrawerOpen } = useAlertManagerDrawerContext();
  const data: DashboardDataGridField[] | null = getGridData(grid, {
    alerts,
    alertsTrans,
    accountsTrans,
  });
  const configs: DashboardDataConfig[] = getGridDataConfigs(grid);

  function handleCellClick(field: string, value?: any) {
    if (field === AlertInfoField.AlertId) {
      const id: number = value as number;
      alertManagerFacade.setAlertId(id);
      setDrawerOpen(true);
    }
  }

  return data != null ? (
    <DashboardGridMui
      data={normaliseMuiGridData<DashboardDataGridField>(data)}
      configs={getMuiGridConfigs(configs)}
      onCellClick={handleCellClick}
    />
  ) : (
    <ErrorMessage>Can't get grid data</ErrorMessage>
  );
}
