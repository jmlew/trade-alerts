import { ReactNode, useMemo } from 'react';

import { Alert, alertManagerFacade } from '@trade-alerts/dashboard/domain';
import { useObservable } from '@trade-alerts/shared/util-common';

import { AlertManagerContext, AlertManagerContextValue } from './alert-manager.context';

interface AlertManagerProviderProps {
  children: ReactNode;
}

export function AlertManagerProvider({ children }: AlertManagerProviderProps) {
  const alerts: Alert[] | null = useObservable<Alert[]>(alertManagerFacade.alerts$);
  const currentId: number | null = useObservable<number | null>(
    alertManagerFacade.alertId$
  );

  const value: AlertManagerContextValue = useMemo(
    () => ({ alerts, currentId }),
    [alerts, currentId]
  );

  return (
    <AlertManagerContext.Provider value={value}>{children}</AlertManagerContext.Provider>
  );
}
