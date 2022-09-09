import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  DataFilters,
  dashboardDataFacade,
  getDataFiltersFromSearchParams,
  useDashboardDataContext,
} from '@kdb-dash/dashboard/domain';
import { ApiStateManager } from '@kdb-dash/shared/data-access';
import { ErrorMessage, JsonViewer, Loading } from '@kdb-dash/shared/ui-common';

const { getError, isCompleted, isFailed, isPending } = ApiStateManager;

export function DataViewerContainer() {
  const [searchParams] = useSearchParams();
  const { dashData, dashDataState } = useDashboardDataContext();
  console.log('dashData, dashDataState', dashData, dashDataState);

  useEffect(() => {
    const filters: DataFilters = getDataFiltersFromSearchParams(searchParams);
    dashboardDataFacade.loadDashData(filters);
  }, []);

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
