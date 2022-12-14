import { UiControlOption } from '@trade-alerts/shared/data-access';

import { DashboardType } from './dashboards.enum';

export const dashboardOptions: UiControlOption[] = [
  {
    value: DashboardType.DashboardA,
    label: 'Private Bank Dashboard A',
  },
  {
    value: DashboardType.DashboardB,
    label: 'Other Scenario Dashboard B',
  },
  {
    value: DashboardType.DashboardC,
    label: 'Another Scenario Dashboard C',
  },
];

export const defaultDashboardOption: UiControlOption = dashboardOptions[0];
