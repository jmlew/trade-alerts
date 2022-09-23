import { useState } from 'react';

import { AlertInfo } from '@kdb-dash/dashboard/domain';
import { useDashboardDataContext } from '@kdb-dash/dashboard/feature/data-provider';
import { GenericMessagePanel } from '@kdb-dash/dashboard/ui/common';
import { DashSelector } from '@kdb-dash/dashboard/ui/controls';
import { Typography } from '@mui/material';

import {
  getAlertOptions,
  getAlertSelectorLabel,
  getAllAlerts,
  getInitialAlert,
} from '../entities/alert-updater.util';

export function AlertSelectorContainer() {
  const { dashData } = useDashboardDataContext();
  const alerts: AlertInfo[] | null = getAllAlerts(dashData);
  const [alert, setAlert] = useState<AlertInfo | null>(getInitialAlert(alerts));

  function handleSelectChange(alertId: number) {
    const item: AlertInfo | null =
      alerts!.find((item: AlertInfo) => item.alertID === alertId) || null;
    setAlert(item);
  }

  return alerts != null ? (
    <DashSelector
      label={getAlertSelectorLabel()}
      value={alert?.alertID || ''}
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
