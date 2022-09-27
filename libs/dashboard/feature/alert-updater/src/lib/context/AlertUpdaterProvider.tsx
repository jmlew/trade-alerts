import { ReactNode, useEffect, useMemo, useState } from 'react';

import { AlertInfo } from '@trade-alerts/dashboard/domain';
import { useDashboardDataContext } from '@trade-alerts/dashboard/feature/data-provider';

import { getAllAlerts, getInitialAlert } from '../entities/alert-updater.util';
import { AlertUpdaterContext, AlertUpdaterContextValue } from './alert-updater.context';

interface AlertUpdaterDrawerProviderProps {
  children: ReactNode;
}

export function AlertUpdaterProvider({ children }: AlertUpdaterDrawerProviderProps) {
  const { dashData } = useDashboardDataContext();
  const [alerts, setAlerts] = useState<AlertInfo[] | null>(null);
  const [currentAlert, setCurrentAlert] = useState<AlertInfo | null>(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setAlerts(getAllAlerts(dashData));
  }, [dashData]);

  useEffect(() => {
    setCurrentAlert(getInitialAlert(alerts));
  }, [alerts]);

  const value: AlertUpdaterContextValue = useMemo(
    () => ({ alerts, currentAlert, setCurrentAlert, isDrawerOpen, setDrawerOpen }),
    [alerts, currentAlert, setCurrentAlert, isDrawerOpen, setDrawerOpen]
  );

  return (
    <AlertUpdaterContext.Provider value={value}>{children}</AlertUpdaterContext.Provider>
  );
}
