import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import {
  DashOption,
  FilterSearchParam,
  dashboardOptions,
  getDasboardOption,
  getDashboardOptionFromSearchParams,
} from '@kdb-dash/dashboard/domain';
import { DashSelector } from '@kdb-dash/dashboard/ui/controls';

export function DashSelectorContainer() {
  // TODO: Get current dashobard from params instead of search params.
  const { dashId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [dashboard, setDashboard] = useState<DashOption>(
    getDashboardOptionFromSearchParams(searchParams)
  );

  useEffect(() => {
    searchParams.set(FilterSearchParam.DashId, dashboard.value);
    setSearchParams(searchParams);
  }, [dashboard]);

  function handleSetDashboard(value: string) {
    const selected: DashOption = getDasboardOption(value);
    setDashboard(selected);
    console.log('selected :>> ', selected.value);
  }
  return (
    <DashSelector
      options={dashboardOptions}
      value={dashboard.value}
      setValue={handleSetDashboard}
    />
  );
}
