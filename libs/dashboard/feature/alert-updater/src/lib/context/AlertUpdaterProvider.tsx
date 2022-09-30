import { ReactNode, useEffect, useMemo, useState } from 'react';

import { AlertInfo, getDashAlerts } from '@trade-alerts/dashboard/domain';
import { useDashboardDataContext } from '@trade-alerts/dashboard/feature/data-provider';

import { getInitialAlert } from '../entities/alert-updater.util';
import { AlertUpdaterContext, AlertUpdaterContextValue } from './alert-updater.context';

interface AlertUpdaterDrawerProviderProps {
  children: ReactNode;
}

export function AlertUpdaterProvider({ children }: AlertUpdaterDrawerProviderProps) {
  const { dashData } = useDashboardDataContext();
  const [alerts, setAlerts] = useState<AlertInfo[] | null>(null);
  const [currentAlertId, setCurrentAlertId] = useState<number | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setAlerts(getDashAlerts(dashData));
  }, [dashData]);

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
