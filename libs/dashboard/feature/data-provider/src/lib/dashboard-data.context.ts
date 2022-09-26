import { Context, createContext, useContext } from 'react';

import { DashboardData } from '@trade-alerts/dashboard/domain';
import { ApiState } from '@trade-alerts/shared/data-access';

export interface DashboardDataContextValue {
  dashData: DashboardData | undefined;
  dashDataState: ApiState | undefined;
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
