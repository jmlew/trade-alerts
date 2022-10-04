import { useAlertManagerContext } from '@trade-alerts/dashboard-feature-alert-manager';
import { AlertOverviewInfo } from '@trade-alerts/dashboard/domain';
import { AlertOverviews } from '@trade-alerts/dashboard/ui/details';

import { getAlertOverviews } from '../entities/dashboard-overview-data.util';

export function OverviewContainer() {
  const { alerts, setCurrentAlertId, setDrawerOpen } = useAlertManagerContext();

  function handleSelectAlert(alertId: number) {
    setCurrentAlertId(alertId);
    setDrawerOpen(true);
  }

  if (alerts == null) {
    return null;
  }
  const overviews: AlertOverviewInfo[] = getAlertOverviews(alerts);
  return <AlertOverviews overviews={overviews} onSelectAlert={handleSelectAlert} />;
}
