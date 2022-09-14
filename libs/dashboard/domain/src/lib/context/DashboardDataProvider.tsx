import { ReactNode, useMemo } from 'react';

import { ApiState } from '@kdb-dash/shared/data-access';
import { useObservable } from '@kdb-dash/shared/util-common';

import { dashboardDataFacade } from '../application/dashboard-data.facade';
import { DashboardData } from '../entities/dashboard-data.model';
import {
  DashboardDataContext,
  DashboardDataContextValue,
} from './dashboard-data.context';

/**
 * Provides downstream access to the dashboard data and API state Observables which
 * are managed through the dashboard data facade. Streams are subscribed to and
 * unsubscribed via the useObservable hook.
 */

interface DashboardDataProviderProps {
  children: ReactNode;
}

export function DashboardDataProvider({ children }: DashboardDataProviderProps) {
  const dashData: DashboardData | undefined = useObservable<DashboardData>(
    dashboardDataFacade.dashData$
  );
  const dashDataState: ApiState | undefined = useObservable<ApiState>(
    dashboardDataFacade.dashDataState$
  );

  const value: DashboardDataContextValue = useMemo(
    () => ({ dashData, dashDataState }),
    [dashData, dashDataState]
  );

  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  );
}
