import { Typography } from '@mui/material';
import { alertManagerFacade } from '@trade-alerts/alert-manage/domain';
import { DashSelector, GenericMessagePanel } from '@trade-alerts/shared/ui-common';

import { useManageAlertsContext } from '../context/manage-alerts.context';
import { getAlertOptions, getAlertSelectorLabel } from '../entities/manager-alerts.util';

export function AlertSelectorContainer() {
  const { alerts, currentId } = useManageAlertsContext();

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
