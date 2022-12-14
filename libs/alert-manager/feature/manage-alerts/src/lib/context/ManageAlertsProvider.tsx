import { ReactNode, useMemo } from 'react';

import { Alert, alertManagerFacade } from '@trade-alerts/alert-manager/domain';
import { useObservable } from '@trade-alerts/shared/util-common';

import { ManageAlertsContext, ManageAlertsContextValue } from './manage-alerts.context';

interface Props {
  children: ReactNode;
}

export function ManageAlertsProvider({ children }: Props) {
  const alerts: Alert[] | null = useObservable(alertManagerFacade.alerts$);
  const currentId: number | null = useObservable(alertManagerFacade.alertId$);

  const value: ManageAlertsContextValue = useMemo(
    () => ({ alerts, currentId }),
    [alerts, currentId]
  );

  return (
    <ManageAlertsContext.Provider value={value}>{children}</ManageAlertsContext.Provider>
  );
}
