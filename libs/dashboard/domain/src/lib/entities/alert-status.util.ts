import { AlertStatus } from './alert-status.enum';

export const alertStatuses: Map<AlertStatus, string> = new Map([
  [AlertStatus.StatusA, 'Close Alert'],
  [AlertStatus.StatusB, 'Needs Investigation'],
  [AlertStatus.StatusC, 'False Positive'],
]);
