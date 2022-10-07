import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { DashSelector } from '@trade-alerts/shared/ui-common';
import { FilterParam } from '@trade-alerts/shared/util-filters';

import { dashboardOptions } from '../entities/dashboards.constants';
import { getInitialDashboardFromSearchParams } from '../entities/dashboards.util';

export function DashboardSelectorContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dashboard, setDashboard] = useState<string>(
    getInitialDashboardFromSearchParams(searchParams)
  );

  function handleSelectorChange(id: string) {
    setDashboard(id);
  }

  useEffect(() => {
    searchParams.set(FilterParam.DashId, dashboard);
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
