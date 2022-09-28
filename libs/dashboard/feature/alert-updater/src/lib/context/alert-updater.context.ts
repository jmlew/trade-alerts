import { Context, createContext, useContext } from 'react';

import { AlertInfo } from '@trade-alerts/dashboard/domain';

export interface AlertUpdaterContextValue {
  isDrawerOpen: boolean;
  setDrawerOpen: (isOpen: boolean) => void;
  alerts: AlertInfo[] | null;
  currentAlertId: number | null;
  setCurrentAlertId: (id: number) => void;
}

export const AlertUpdaterContext: Context<AlertUpdaterContextValue> = createContext(
  {} as AlertUpdaterContextValue
);

export function useAlertUpdaterContext() {
  const context: AlertUpdaterContextValue = useContext(AlertUpdaterContext);
  if (context === undefined) {
    throw new Error(
      'useAlertUpdaterDrawerContext must be used within a AlertUpdaterDrawerContext'
    );
  }
  return context;
}
