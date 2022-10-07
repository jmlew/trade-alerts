import { AlertOverviewInfo, alertManagerFacade } from '@trade-alerts/dashboard/domain';
import { useAlertManagerDrawerContext } from '@trade-alerts/dashboard/feature/alert-manager-drawer';
import { useDashboardDataContext } from '@trade-alerts/dashboard/feature/data-provider';
import { AlertOverviews } from '@trade-alerts/dashboard/ui/details';

import { getAlertOverviews } from '../entities/dashboard-overview-data.util';

export function OverviewContainer() {
  const { alerts } = useDashboardDataContext();
  const { setDrawerOpen } = useAlertManagerDrawerContext();

  function handleSelectAlert(alertId: number) {
    alertManagerFacade.setAlertId(alertId);
    setDrawerOpen(true);
  }

  if (alerts == null) {
    return null;
  }
  const overviews: AlertOverviewInfo[] = getAlertOverviews(alerts);
  return <AlertOverviews overviews={overviews} onSelectAlert={handleSelectAlert} />;
}
