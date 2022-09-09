import { Context, createContext, useContext } from 'react';

import { ApiState } from '@kdb-dash/shared/data-access';

import { DashboardData } from '../entities/dashboard-data.model';

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
