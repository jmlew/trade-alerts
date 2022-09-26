import { AlertInfo, AlertOverviewInfo, getAlertById } from '@kdb-dash/dashboard/domain';
import { useAlertUpdaterContext } from '@kdb-dash/dashboard/feature/alert-updater';
import { AlertOverviews } from '@kdb-dash/dashboard/ui/details';

import { getAlertOverviews } from '../entities/dashboard-overview-data.util';

export function OverviewContainer() {
  const { alerts, setCurrentAlert, setDrawerOpen } = useAlertUpdaterContext();

  function handleSelectAlert(value: string | number) {
    if (alerts == null) {
      return;
    }
    const alert: AlertInfo | null = getAlertById(alerts, value);
    if (alert) {
      setCurrentAlert(alert);
      setDrawerOpen(true);
    }
  }

  if (alerts == null) {
    return null;
  }
  const overviews: AlertOverviewInfo[] = getAlertOverviews(alerts);
  return <AlertOverviews overviews={overviews} onSelectAlert={handleSelectAlert} />;
}
