import { AlertInfo } from '@kdb-dash/dashboard/domain';
import { GenericMessagePanel } from '@kdb-dash/dashboard/ui/common';
import { DashSelector } from '@kdb-dash/dashboard/ui/controls';
import { Typography } from '@mui/material';

import { useAlertUpdaterContext } from '../context/alert-updater.context';
import { getAlertOptions, getAlertSelectorLabel } from '../entities/alert-updater.util';

export function AlertSelectorContainer() {
  const { alerts, currentAlert, setCurrentAlert } = useAlertUpdaterContext();

  function handleSelectChange(alertId: number) {
    const item: AlertInfo | null =
      alerts != null
        ? alerts.find((item: AlertInfo) => item.alertID === alertId) || null
        : null;
    if (item != null) {
      setCurrentAlert(item);
    }
  }

  return alerts != null ? (
    <DashSelector
      label={getAlertSelectorLabel()}
      value={currentAlert?.alertID || ''}
      onChange={handleSelectChange}
      options={getAlertOptions(alerts)}
    />
  ) : (
    <NoAlertsFoundMessage />
  );
}

function NoAlertsFoundMessage() {
  return (
    <GenericMessagePanel>
      <Typography variant="body1" align="center" color="primary.light">
        No Alerts found for the currrent filters.
      </Typography>
    </GenericMessagePanel>
  );
}
