import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { FilterSearchParam } from '@kdb-dash/dashboard/domain';
import { DashSelector } from '@kdb-dash/dashboard/ui/controls';
import { UiControlOption } from '@kdb-dash/shared/data-access';

import { dashboardOptions } from '../entities/dashboards.constants';
import {
  getDasboardOption,
  getDashboardOptionFromSearchParams,
} from '../entities/dashboards.util';

export function DashSelectorContainer() {
  // TODO: Get current dashobard from params instead of search params.
  const { dashId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [dashboard, setDashboard] = useState<UiControlOption>(
    getDashboardOptionFromSearchParams(searchParams)
  );

  useEffect(() => {
    searchParams.set(FilterSearchParam.DashId, dashboard.value);
    setSearchParams(searchParams);
  }, [dashboard]);

  function handleSetDashboard(value: string) {
    const selected: UiControlOption = getDasboardOption(value);
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
