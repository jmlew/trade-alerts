import { ReactNode, useMemo, useState } from 'react';

import { AlertInfo } from '@kdb-dash/dashboard/domain';
import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';

import { getAllAlerts, getInitialAlert } from '../entities/alert-updater.util';
import { AlertUpdaterContext, AlertUpdaterContextValue } from './alert-updater.context';

interface AlertUpdaterDrawerProviderProps {
  children: ReactNode;
}

export function AlertUpdaterProvider({ children }: AlertUpdaterDrawerProviderProps) {
  const { dashData } = useDashboardDataContext();
  const alerts: AlertInfo[] | null = getAllAlerts(dashData);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<AlertInfo | null>(
    getInitialAlert(alerts)
  );

  const value: AlertUpdaterContextValue = useMemo(
    () => ({ alerts, currentAlert, setCurrentAlert, isDrawerOpen, setDrawerOpen }),
    [alerts, currentAlert, setCurrentAlert, isDrawerOpen, setDrawerOpen]
  );

  return (
    <AlertUpdaterContext.Provider value={value}>{children}</AlertUpdaterContext.Provider>
  );
}
