import { Context, createContext, useContext } from 'react';

import { Alert } from '@trade-alerts/alert-manager/domain';

export interface ManageAlertsContextValue {
  alerts: Alert[] | null;
  currentId: number | null;
}

export const ManageAlertsContext: Context<ManageAlertsContextValue> = createContext(
  {} as ManageAlertsContextValue
);

export function useManageAlertsContext() {
  const context: ManageAlertsContextValue = useContext(ManageAlertsContext);
  if (context === undefined) {
    throw new Error('useManageAlertsContext must be used within a ManageAlertsProvider');
  }
  return context;
}
