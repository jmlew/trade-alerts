import { useSearchParams } from 'react-router-dom';

import { DataFilters, getDataFiltersFromSearchParams } from '@kdb-dash/dashboard/domain';
import { BtnLoadData } from '@kdb-dash/dashboard/ui/controls';

export function DataLoaderContainer() {
  const [searchParams] = useSearchParams();

  function handleLoadData() {
    const filters: DataFilters = getDataFiltersFromSearchParams(searchParams);
    console.log('handleLoadData with filters :>> ', filters);
  }

  return <BtnLoadData isDisabled={false} onClick={handleLoadData} />;
}
