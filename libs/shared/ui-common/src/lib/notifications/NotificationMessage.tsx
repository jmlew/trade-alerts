import { SyntheticEvent } from 'react';

import { Alert, Snackbar, SnackbarCloseReason, SnackbarOrigin } from '@mui/material';

import { NotificationAlign, NotificationType } from './notifications.enum';
import { getAlignment, getAlignmentByType } from './notifications.util';

interface NotificationMessageProps {
  message: string;
  isShown: boolean;
  onClose: () => void;
  type?: NotificationType;
  align?: NotificationAlign;
  duration?: number;
}

export function NotificationMessage({
  message,
  isShown,
  onClose,
  type,
  duration,
  align,
}: NotificationMessageProps) {
  const severity: NotificationType = type || NotificationType.Error;
  const anchorOrigin: SnackbarOrigin =
    align != null ? getAlignment(align) : getAlignmentByType(severity);
  function handleClose(event: SyntheticEvent, reason?: SnackbarCloseReason) {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  }
  return (
    <Snackbar
      open={isShown}
      autoHideDuration={duration || 3000}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
