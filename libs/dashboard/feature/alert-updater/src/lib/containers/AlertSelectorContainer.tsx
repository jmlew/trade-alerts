import { Typography } from '@mui/material';
import { AlertInfo, getAlertById } from '@trade-alerts/dashboard/domain';
import { GenericMessagePanel } from '@trade-alerts/dashboard/ui/common';
import { DashSelector } from '@trade-alerts/dashboard/ui/controls';

import { useAlertUpdaterContext } from '../context/alert-updater.context';
import { getAlertOptions, getAlertSelectorLabel } from '../entities/alert-updater.util';

export function AlertSelectorContainer() {
  const { alerts, currentAlert, setCurrentAlert } = useAlertUpdaterContext();

  function handleSelectChange(alertId: number) {
    if (alerts == null) {
      return;
    }
    const item: AlertInfo | null = getAlertById(alerts, alertId);
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
