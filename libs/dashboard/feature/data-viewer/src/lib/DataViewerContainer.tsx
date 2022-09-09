import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  DashboardData,
  DataFilters,
  dashboardDataFacade,
  getDataFiltersFromSearchParams,
} from '@kdb-dash/dashboard/domain';
import { ApiState, ApiStateManager } from '@kdb-dash/shared/data-access';
import { ErrorMessage, JsonViewer, Loading } from '@kdb-dash/shared/ui-common';
import { useObservable } from '@kdb-dash/shared/util-common';

const { getError, isCompleted, isFailed, isPending } = ApiStateManager;

export function DataViewerContainer() {
  const [searchParams] = useSearchParams();
  const dashData: DashboardData | undefined = useObservable<DashboardData>(
    dashboardDataFacade.dashData$
  );
  const dashDataState: ApiState | undefined = useObservable<ApiState>(
    dashboardDataFacade.dashDataState$
  );

  useEffect(() => {
    const filters: DataFilters = getDataFiltersFromSearchParams(searchParams);
    dashboardDataFacade.loadDashData(filters);
  }, []);

  // TODO: add observable hook to context and provide values to all consumers: limits
  // access to observable to a single consumer (context).
  // console.log('dashData', dashData);
  // console.log('dashDataState', dashDataState);

  if (dashDataState == null) {
    return null;
  }
  return (
    <>
      {isPending(dashDataState) && <Loading message="Loading Dashboard" />}
      {isFailed(dashDataState) && <ErrorMessage>{getError(dashDataState)}</ErrorMessage>}
      {isCompleted(dashDataState) && dashData != null && (
        <JsonViewer data={dashData as object} sx={{ width: 0.8 }} />
      )}
    </>
  );
}
