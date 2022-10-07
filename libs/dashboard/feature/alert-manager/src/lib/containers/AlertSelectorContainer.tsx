import { Typography } from '@mui/material';
import { alertManagerFacade } from '@trade-alerts/dashboard/domain';
import { GenericMessagePanel } from '@trade-alerts/dashboard/ui/common';
import { DashSelector } from '@trade-alerts/dashboard/ui/controls';

import { useAlertManagerContext } from '../context/alert-manager.context';
import { getAlertOptions, getAlertSelectorLabel } from '../entities/alert-manager.util';

export function AlertSelectorContainer() {
  const { alerts, currentId } = useAlertManagerContext();

  function handleSelectChange(alertId: number) {
    alertManagerFacade.setAlertId(alertId);
  }

  return alerts != null ? (
    <DashSelector
      label={getAlertSelectorLabel()}
      value={currentId || ''}
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
