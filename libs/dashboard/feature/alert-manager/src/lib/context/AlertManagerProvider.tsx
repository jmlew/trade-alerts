import { ReactNode, useMemo } from 'react';

import { AlertInfo, alertManagerFacade } from '@trade-alerts/dashboard/domain';
import { useObservable } from '@trade-alerts/shared/util-common';

import { AlertManagerContext, AlertManagerContextValue } from './alert-manager.context';

interface AlertManagerProviderProps {
  children: ReactNode;
}

export function AlertManagerProvider({ children }: AlertManagerProviderProps) {
  const alerts: AlertInfo[] | null = useObservable<AlertInfo[]>(
    alertManagerFacade.alerts$
  );
  const currentAlertId: number | null = useObservable<number | null>(
    alertManagerFacade.alertId$
  );

  const value: AlertManagerContextValue = useMemo(
    () => ({ alerts, currentAlertId }),
    [alerts, currentAlertId]
  );

  return (
    <AlertManagerContext.Provider value={value}>{children}</AlertManagerContext.Provider>
  );
}
