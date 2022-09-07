import { dashboardOptions, defaultDashboardOption } from './dashboards.constants';
import { DashOption } from './dashboards.model';

export function getDasboardOption(dashboardId: string) {
  return (
    dashboardOptions.find((option: DashOption) => option.value === dashboardId) ||
    defaultDashboardOption
  );
}
