import { AlertAlign, AlertType } from '@kdb-dash/shared/ui-common';

export interface AlertConfig {
  isShown: boolean;
  message: string;
  type?: AlertType;
  align?: AlertAlign;
  duration?: number;
}
