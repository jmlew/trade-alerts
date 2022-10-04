import { ReactNode, useEffect, useMemo, useState } from 'react';

import { useDashboardDataContext } from '@trade-alerts/dashboard/feature/data-provider';

import { getInitialAlert } from '../entities/alert-manager.util';
import { AlertManagerContext, AlertManagerContextValue } from './alert-manager.context';

interface AlertManagerProviderProps {
  children: ReactNode;
}

export function AlertManagerProvider({ children }: AlertManagerProviderProps) {
  const { alerts } = useDashboardDataContext();
  const [currentAlertId, setCurrentAlertId] = useState<number | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const id: number | null =
      currentAlertId ?? (getInitialAlert(alerts)?.alertID || null);
    setCurrentAlertId(id);
  }, [alerts, currentAlertId]);

  const value: AlertManagerContextValue = useMemo(
    () => ({ alerts, currentAlertId, setCurrentAlertId, isDrawerOpen, setDrawerOpen }),
    [alerts, currentAlertId, setCurrentAlertId, isDrawerOpen, setDrawerOpen]
  );

  return (
    <AlertManagerContext.Provider value={value}>{children}</AlertManagerContext.Provider>
  );
}
