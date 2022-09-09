import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import {
  DataFilters,
  dashboardDataFacade,
  getDataFiltersFromSearchParams,
} from '@kdb-dash/dashboard/domain';
import { BtnLoadData } from '@kdb-dash/dashboard/ui/controls';

export function DataLoaderContainer() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    handleLoadData();
  }, []);

  function handleLoadData() {
    const filters: DataFilters = getDataFiltersFromSearchParams(searchParams);
    dashboardDataFacade.loadDashData(filters);
  }

  return <BtnLoadData isDisabled={false} onClick={handleLoadData} />;
}
