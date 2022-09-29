import { FilterParam } from '@trade-alerts/dashboard/domain';
import { UiControlOption } from '@trade-alerts/shared/data-access';

import { dashboardOptions, defaultDashboardOption } from './dashboards.constants';

export function getDasboardOption(dashboardId: string): UiControlOption {
  return (
    dashboardOptions.find((option: UiControlOption) => option.value === dashboardId) ||
    defaultDashboardOption
  );
}

export function getInitialDashboardFromSearchParams(params: URLSearchParams): string {
  return params.get(FilterParam.DashId) || (defaultDashboardOption.value as string);
}
