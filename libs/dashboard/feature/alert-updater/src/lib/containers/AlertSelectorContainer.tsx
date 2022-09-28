import { Typography } from '@mui/material';
import { GenericMessagePanel } from '@trade-alerts/dashboard/ui/common';
import { DashSelector } from '@trade-alerts/dashboard/ui/controls';

import { useAlertUpdaterContext } from '../context/alert-updater.context';
import { getAlertOptions, getAlertSelectorLabel } from '../entities/alert-updater.util';

export function AlertSelectorContainer() {
  const { alerts, currentAlertId, setCurrentAlertId } = useAlertUpdaterContext();

  function handleSelectChange(alertId: number) {
    setCurrentAlertId(alertId);
  }

  return alerts != null ? (
    <DashSelector
      label={getAlertSelectorLabel()}
      value={currentAlertId || ''}
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
