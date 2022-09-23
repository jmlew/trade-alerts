import { UiControlOption } from '@kdb-dash/shared/data-access';

export const dashboardOptions: UiControlOption[] = [
  {
    value: 'SomeDashboard',
    label: 'Some Dashboard',
  },
  {
    value: 'OtherDashboard',
    label: 'Other Dashboard',
  },
  {
    value: 'AndAnotherDashboard',
    label: 'And Another Dashboard',
  },
];

export const defaultDashboardOption: UiControlOption = dashboardOptions[0];
