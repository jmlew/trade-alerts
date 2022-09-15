import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  DataFilters,
  dashboardDataFacade,
  getDataFiltersFromSearchParams,
} from '@kdb-dash/dashboard/domain';
import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';
import { BtnLoadData } from '@kdb-dash/dashboard/ui/controls';
import { ApiStateManager } from '@kdb-dash/shared/data-access';

export function DataLoaderContainer() {
  const [searchParams] = useSearchParams();

  const { dashDataState } = useDashboardDataContext();

  useEffect(() => {
    handleLoadData();
  }, []);

  function handleLoadData() {
    const filters: DataFilters = getDataFiltersFromSearchParams(searchParams);
    dashboardDataFacade.loadDashData(filters);
  }

  return (
    <BtnLoadData
      isDisabled={dashDataState && ApiStateManager.isPending(dashDataState)}
      onClick={handleLoadData}
    />
  );
}
