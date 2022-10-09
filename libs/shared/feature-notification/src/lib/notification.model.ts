import { NotificationAlign, NotificationType } from '@trade-alerts/shared/ui-common';

export interface NotificationConfig {
  isShown: boolean;
  message: string;
  type?: NotificationType;
  align?: NotificationAlign;
  duration?: number;
}
