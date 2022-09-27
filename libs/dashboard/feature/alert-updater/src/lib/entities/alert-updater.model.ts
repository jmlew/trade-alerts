import { AlertStatus } from '@trade-alerts/dashboard/domain';

export interface AlertUpdateFormParams {
  action: AlertStatus;
  comment: string | null;
}
