import { ReactNode, useMemo } from 'react';

import {
  AlertInfo,
  DashboardData,
  dashboardDataFacade,
} from '@trade-alerts/dashboard/domain';
import { ApiState } from '@trade-alerts/shared/data-access';
import { useObservable } from '@trade-alerts/shared/util-common';

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
  const dashData: DashboardData | null = useObservable<DashboardData>(
    dashboardDataFacade.dashData$
  );
  const alerts: AlertInfo[] | null = useObservable<AlertInfo[]>(
    dashboardDataFacade.dashAlerts$
  );
  const dashDataState: ApiState | null = useObservable<ApiState>(
    dashboardDataFacade.dashDataState$
  );
  const value: DashboardDataContextValue = useMemo(() => {
    const current = {
      dataState: dashDataState,
      trades: dashData?.trades || null,
      alertsTrans: dashData?.alertsTrans || null,
      accountsTrans: dashData?.accountsTrans || null,
      alerts,
    };
    return current;
  }, [dashData, dashDataState]);

  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  );
}
