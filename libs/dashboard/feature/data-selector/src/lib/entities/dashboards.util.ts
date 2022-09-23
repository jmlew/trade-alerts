import { FilterSearchParam } from '@kdb-dash/dashboard/domain';
import { UiControlOption } from '@kdb-dash/shared/data-access';

import { dashboardOptions, defaultDashboardOption } from './dashboards.constants';

export function getDasboardOption(dashboardId: string): UiControlOption {
  return (
    dashboardOptions.find((option: UiControlOption) => option.value === dashboardId) ||
    defaultDashboardOption
  );
}

export function getInitialDashboardFromSearchParams(params: URLSearchParams): string {
  return params.get(FilterSearchParam.DashId) || (defaultDashboardOption.value as string);
}
