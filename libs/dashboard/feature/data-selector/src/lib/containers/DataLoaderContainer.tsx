import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  DataFilters,
  dashboardDataFacade,
  getDataFiltersFromSearchParams,
} from '@trade-alerts/dashboard/domain';
import { useDashboardDataContext } from '@trade-alerts/dashboard/feature/data-provider';
import { BtnLoadData } from '@trade-alerts/dashboard/ui/controls';
import { useApiStateReference } from '@trade-alerts/shared/data-access';

export function DataLoaderContainer() {
  const [searchParams] = useSearchParams();

  const { dashDataState } = useDashboardDataContext();
  const dashDataStateRef = useApiStateReference(dashDataState);

  useEffect(() => {
    handleLoadData();
  }, []);

  function handleLoadData() {
    const filters: DataFilters = getDataFiltersFromSearchParams(searchParams);
    dashboardDataFacade.loadDashData(filters);
  }

  return (
    <BtnLoadData isLoading={dashDataStateRef.isPending()} onClick={handleLoadData} />
  );
}
