import { Context, createContext, useContext } from 'react';

import {
  AccountsTransInfo,
  AlertInfo,
  AlertsTransInfo,
  TradesInfo,
} from '@trade-alerts/dashboard/domain';
import { ApiState } from '@trade-alerts/shared/data-access';

export interface DashboardDataContextValue {
  dataState: ApiState | null;
  trades: TradesInfo[] | null;
  alerts: AlertInfo[] | null;
  alertsTrans: AlertsTransInfo[] | null;
  accountsTrans: AccountsTransInfo[] | null;
}

export const DashboardDataContext: Context<DashboardDataContextValue> = createContext(
  {} as DashboardDataContextValue
);

export function useDashboardDataContext(): DashboardDataContextValue {
  const context: DashboardDataContextValue = useContext(DashboardDataContext);
  if (context === undefined) {
    throw new Error(
      'useDashboardDataContext must be used within a DashboardDataContextProvider'
    );
  }
  return context;
}
