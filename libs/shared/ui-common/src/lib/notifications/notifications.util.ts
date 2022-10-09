import { SnackbarOrigin } from '@mui/material';

import { NotificationAlign, NotificationType } from './notifications.enum';

export function getAlignmentByType(type: NotificationType): SnackbarOrigin {
  switch (type) {
    case NotificationType.Error:
      return getAlignment(NotificationAlign.TopCenter);
    case NotificationType.Success:
      return getAlignment(NotificationAlign.TopCenter);
    case NotificationType.Warning:
      return getAlignment(NotificationAlign.TopCenter);
    case NotificationType.Info:
    default:
      return getAlignment(NotificationAlign.BottomCenter);
  }
}

export function getAlignment(align: NotificationAlign): SnackbarOrigin {
  switch (align) {
    case NotificationAlign.TopCenter:
      return {
        vertical: 'top',
        horizontal: 'center',
      };
    case NotificationAlign.BottomCenter:
    default:
      return {
        vertical: 'bottom',
        horizontal: 'center',
      };
  }
}
