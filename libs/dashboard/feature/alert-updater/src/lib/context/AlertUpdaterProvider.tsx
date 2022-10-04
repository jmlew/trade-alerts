import { ReactNode, useEffect, useMemo, useState } from 'react';

import { useDashboardDataContext } from '@trade-alerts/dashboard/feature/data-provider';

import { getInitialAlert } from '../entities/alert-updater.util';
import { AlertUpdaterContext, AlertUpdaterContextValue } from './alert-updater.context';

interface AlertUpdaterDrawerProviderProps {
  children: ReactNode;
}

export function AlertUpdaterProvider({ children }: AlertUpdaterDrawerProviderProps) {
  const { alerts } = useDashboardDataContext();
  const [currentAlertId, setCurrentAlertId] = useState<number | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const id: number | null =
      currentAlertId ?? (getInitialAlert(alerts)?.alertID || null);
    setCurrentAlertId(id);
  }, [alerts, currentAlertId]);

  const value: AlertUpdaterContextValue = useMemo(
    () => ({ alerts, currentAlertId, setCurrentAlertId, isDrawerOpen, setDrawerOpen }),
    [alerts, currentAlertId, setCurrentAlertId, isDrawerOpen, setDrawerOpen]
  );

  return (
    <AlertUpdaterContext.Provider value={value}>{children}</AlertUpdaterContext.Provider>
  );
}
