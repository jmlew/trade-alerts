import { Context, createContext, useContext } from 'react';

import { AlertInfo } from '@trade-alerts/dashboard/domain';

export interface AlertManagerContextValue {
  isDrawerOpen: boolean;
  setDrawerOpen: (isOpen: boolean) => void;
  alerts: AlertInfo[] | null;
  currentAlertId: number | null;
  setCurrentAlertId: (id: number) => void;
}

export const AlertManagerContext: Context<AlertManagerContextValue> = createContext(
  {} as AlertManagerContextValue
);

export function useAlertManagerContext() {
  const context: AlertManagerContextValue = useContext(AlertManagerContext);
  if (context === undefined) {
    throw new Error('useAlertManagerContext must be used within a AlertManagerProvider');
  }
  return context;
}