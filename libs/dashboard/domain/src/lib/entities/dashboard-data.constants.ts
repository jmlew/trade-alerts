import { AlertStatus } from './dashboard-data.enum';

export const alertStatuses: Map<AlertStatus, string> = new Map([
  [AlertStatus.StatusA, 'Close Alert'],
  [AlertStatus.StatusB, 'Needs Investigation'],
  [AlertStatus.StatusC, 'False Positive'],
]);
