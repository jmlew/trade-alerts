import { AlertStatus } from '@trade-alerts/dashboard/api';

export interface AlertUpdateFormParams {
  status: AlertStatus;
  comment: string | null;
}
