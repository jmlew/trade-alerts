import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { DashOption, dashboards } from '@kdb-dash/dashboard/domain';
import { DashSelector } from '@kdb-dash/dashboard/ui/controls';

const defaultOption: DashOption = dashboards[0];

export function DashSelectorContainer() {
  // TODO: Get current dashobard from params;
  const { dashId } = useParams();
  const [dashboard, setDashboard] = useState<DashOption>(defaultOption);

  function handleSetDashboard(value: string) {
    const selected: DashOption =
      dashboards.find((option: DashOption) => option.value === value) || defaultOption;
    setDashboard(selected);
    console.log('selected :>> ', selected.value);
  }
  return (
    <DashSelector
      options={dashboards}
      value={dashboard.value}
      setValue={handleSetDashboard}
    />
  );
}
