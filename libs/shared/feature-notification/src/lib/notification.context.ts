import { Context, createContext, useContext } from 'react';

import { NotificationConfig } from './notification.model';

export interface NotificationContextValue {
  notification: NotificationConfig;
  setNotification: (alert: NotificationConfig) => void;
}

export const NotificationContext: Context<NotificationContextValue> =
  createContext<NotificationContextValue>({} as NotificationContextValue);

export function useNotification(): NotificationContextValue {
  const context: NotificationContextValue = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationContextProvider');
  }
  return context;
}
