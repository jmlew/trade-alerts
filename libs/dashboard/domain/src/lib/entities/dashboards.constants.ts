import { DashOption } from './dashboards.model';

export const dashboardOptions: DashOption[] = [
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

export const defaultDashboardOption: DashOption = dashboardOptions[0];
