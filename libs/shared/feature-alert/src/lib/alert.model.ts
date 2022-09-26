import { AlertAlign, AlertType } from '@trade-alerts/shared/ui-common';

export interface AlertConfig {
  isShown: boolean;
  message: string;
  type?: AlertType;
  align?: AlertAlign;
  duration?: number;
}
