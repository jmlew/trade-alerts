import { AlertStatus } from '@trade-alerts/dashboard/domain';

export interface AlertUpdateFormParams {
  status: AlertStatus;
  comment: string | null;
}
