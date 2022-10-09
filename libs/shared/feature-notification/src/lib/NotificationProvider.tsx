import { ReactNode, useState } from 'react';

import { NotificationContainer } from './NotificationContainer';
import { NotificationContext } from './notification.context';
import { NotificationConfig } from './notification.model';

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const config: NotificationConfig = {
    isShown: false,
    message: '',
  };

  const [notification, setNotification] = useState(config);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      <NotificationContainer />
      {children}
    </NotificationContext.Provider>
  );
}
