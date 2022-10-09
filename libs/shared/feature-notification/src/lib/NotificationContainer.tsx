import { NotificationMessage } from '@trade-alerts/shared/ui-common';

import { useNotification } from './notification.context';

export function NotificationContainer() {
  const { notification, setNotification } = useNotification();
  const { isShown, message, type, duration, align } = notification;
  function handleClose() {
    setNotification({ ...notification, isShown: false });
  }
  return (
    <NotificationMessage
      message={message}
      isShown={isShown}
      onClose={handleClose}
      type={type}
      duration={duration}
      align={align}
    />
  );
}
