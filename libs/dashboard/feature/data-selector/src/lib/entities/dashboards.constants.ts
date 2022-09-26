import { UiControlOption } from '@trade-alerts/shared/data-access';

export const dashboardOptions: UiControlOption[] = [
  {
    value: 'ScenarioA',
    label: 'Some Scenario',
  },
  {
    value: 'ScenarioB',
    label: 'Some Other Scenario',
  },
  {
    value: 'ScenarioC',
    label: 'And Another Scenario',
  },
];

export const defaultDashboardOption: UiControlOption = dashboardOptions[0];
