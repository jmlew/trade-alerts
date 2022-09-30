import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { dashboardDataFacade } from '@trade-alerts/dashboard/domain';
import { useDashboardDataContext } from '@trade-alerts/dashboard/feature/data-provider';
import { BtnLoadData } from '@trade-alerts/dashboard/ui/controls';
import { useApiStateReference } from '@trade-alerts/shared/data-access';
import {
  DataFilters,
  getDataFiltersFromSearchParams,
  getSearchParamsFromDataFilters,
} from '@trade-alerts/shared/util-filters';

import { defaultDateRange } from '../entities/dates.constants';

export function DataLoaderContainer() {
  const [searchParams] = useSearchParams();

  const { dashDataState } = useDashboardDataContext();
  const dashDataStateRef = useApiStateReference(dashDataState);

  useEffect(() => {
    handleLoadData();
  }, []);

  function handleLoadData() {
    // TODO: Add single serialiser to simply the below methods.
    const filters: DataFilters = getDataFiltersFromSearchParams(
      searchParams,
      defaultDateRange
    );
    const params: URLSearchParams = getSearchParamsFromDataFilters(filters);
    dashboardDataFacade.loadDashData(params);
  }

  return (
    <BtnLoadData isLoading={dashDataStateRef.isPending()} onClick={handleLoadData} />
  );
}
