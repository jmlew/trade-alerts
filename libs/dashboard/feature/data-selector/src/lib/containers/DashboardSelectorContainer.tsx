import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { FilterSearchParam } from '@trade-alerts/dashboard/domain';
import { DashSelector } from '@trade-alerts/dashboard/ui/controls';

import { dashboardOptions } from '../entities/dashboards.constants';
import { getInitialDashboardFromSearchParams } from '../entities/dashboards.util';

export function DashboardSelectorContainer() {
  // TODO: Get current dashobard from params instead of search params.
  const { dashId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [dashboard, setDashboard] = useState<string>(
    getInitialDashboardFromSearchParams(searchParams)
  );

  function handleSelectorChange(id: string) {
    setDashboard(id);
  }

  useEffect(() => {
    searchParams.set(FilterSearchParam.DashId, dashboard);
    setSearchParams(searchParams);
  }, [dashboard]);

  return (
    <DashSelector
      options={dashboardOptions}
      value={dashboard}
      onChange={handleSelectorChange}
    />
  );
}
