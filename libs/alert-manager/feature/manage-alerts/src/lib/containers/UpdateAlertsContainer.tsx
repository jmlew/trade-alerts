import { useEffect, useState } from 'react';

import { Typography } from '@mui/material';
import { Alert, alertManagerFacade } from '@trade-alerts/alert-manager/domain';
import { ApiState, useApiStateReference } from '@trade-alerts/shared/data-access';
import { useNotification } from '@trade-alerts/shared/feature/notification';
import { NotificationType } from '@trade-alerts/shared/ui-common';
import { useObservable } from '@trade-alerts/shared/util-common';

import { AlertUpdateForm } from '../components/AlertUpdateForm';
import { useManageAlertsContext } from '../context/manage-alerts.context';
import { AlertUpdateFormParams } from '../entities/manager-alerts.model';
import {
  getAlertById,
  getAlertUpdateParams,
  getInitialFormValues,
} from '../entities/manager-alerts.util';

export function UpdateAlertsContainer() {
  const { setNotification } = useNotification();
  const { alerts, currentId } = useManageAlertsContext();
  const [currentAlert, setCurrentAlert] = useState<Alert | null>(null);
  const [initialValues, setInitialValues] = useState<AlertUpdateFormParams>(
    getInitialFormValues(currentAlert)
  );
  const alertUpdateState: ApiState | null = useObservable<ApiState>(
    alertManagerFacade.alertUpdateState$
  );
  const alertUpdateStateRef = useApiStateReference(alertUpdateState);
  const { isCompleted, wasPending, isPending, isFailed, getError } = alertUpdateStateRef;

  useEffect(() => {
    const alert: Alert | null =
      alerts != null && currentId != null ? getAlertById(alerts, currentId) : null;
    setCurrentAlert(alert);
    setInitialValues(getInitialFormValues(alert));
  }, [alerts, currentId]);

  useEffect(() => {
    if (isCompleted() && wasPending()) {
      const message = `Alert ${currentId} has been updated`;
      setNotification({
        isShown: true,
        type: NotificationType.Success,
        duration: 1200,
        message,
      });
    }
    if (isFailed()) {
      setNotification({ isShown: true, message: getError() || 'Alert update failed' });
    }
  }, [alertUpdateState, currentId, setNotification]);

  function handleSubmit(values: AlertUpdateFormParams) {
    currentId && alertManagerFacade.updateAlert(currentId, getAlertUpdateParams(values));
  }

  function handleCancel() {
    // TODO: open drawer via call to dashboard facade.
    // setDrawerOpen(false);
  }

  return currentAlert != null ? (
    <AlertUpdateForm
      initialValues={initialValues}
      isPending={isPending()}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  ) : (
    <Typography variant="body1" color="primary.main">
      Select an Alert
    </Typography>
  );
}
