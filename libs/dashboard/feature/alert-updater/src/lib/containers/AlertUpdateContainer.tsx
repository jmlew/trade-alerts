import { useEffect, useState } from 'react';

import { Typography } from '@mui/material';
import {
  AlertInfo,
  AlertUpdateParams,
  dashboardDataFacade,
  getAlertById,
} from '@trade-alerts/dashboard/domain';
import { ApiState, ApiStateManager, isPending } from '@trade-alerts/shared/data-access';
import { useAlert } from '@trade-alerts/shared/feature-alert';
import { AlertType } from '@trade-alerts/shared/ui-common';
import { useObservable } from '@trade-alerts/shared/util-common';

import { AlertUpdateForm } from '../components/AlertUpdateForm';
import { useAlertUpdaterContext } from '../context/alert-updater.context';
import { AlertUpdateFormParams } from '../entities/alert-updater.model';
import {
  getAlertActionLabel,
  getAlertUpdateParams,
  getInitialFormValues,
} from '../entities/alert-updater.util';

export function AlertUpdateContainer() {
  const { setAlert } = useAlert();
  const { alerts, currentAlertId, setDrawerOpen } = useAlertUpdaterContext();
  const [currentAlert, setCurrentAlert] = useState<AlertInfo | null>(null);
  const alertUpdateState: ApiState | undefined = useObservable<ApiState>(
    dashboardDataFacade.alertUpdateState$
  );

  useEffect(() => {
    const alert: AlertInfo | null =
      alerts != null && currentAlertId != null
        ? getAlertById(alerts, currentAlertId)
        : null;
    setCurrentAlert(alert);
  }, [alerts, currentAlertId]);

  function handleSubmit(values: AlertUpdateFormParams) {
    // TODO: implement CRUD and handle errors.
    const params: AlertUpdateParams = getAlertUpdateParams(values);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    dashboardDataFacade.updateAlert(currentAlertId!, params);
    setTimeout(() => {
      const message = `Alert ${currentAlertId} has been updated to ${getAlertActionLabel(
        values.action
      )}`;
      setAlert({ isShown: true, type: AlertType.Success, message });
    }, 700);
  }

  function handleCancel() {
    setDrawerOpen(false);
  }

  const isPending: boolean =
    (alertUpdateState && ApiStateManager.isPending(alertUpdateState)) || false;
  return currentAlert != null ? (
    <AlertUpdateForm
      initialValues={getInitialFormValues(currentAlert)}
      isPending={isPending}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  ) : (
    <Typography variant="body1" color="primary.main">
      Select an Alert
    </Typography>
  );
}
