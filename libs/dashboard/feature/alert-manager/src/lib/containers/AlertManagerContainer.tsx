import { useEffect, useState } from 'react';

import { Typography } from '@mui/material';
import {
  AlertInfo,
  alertManagerFacade,
  getAlertById,
} from '@trade-alerts/dashboard/domain';
import { ApiState, useApiStateReference } from '@trade-alerts/shared/data-access';
import { useAlert } from '@trade-alerts/shared/feature-alert';
import { AlertType } from '@trade-alerts/shared/ui-common';
import { useObservable } from '@trade-alerts/shared/util-common';

import { AlertUpdateForm } from '../components/AlertUpdateForm';
import { useAlertManagerContext } from '../context/alert-manager.context';
import { AlertUpdateFormParams } from '../entities/alert-manager.model';
import {
  getAlertUpdateParams,
  getInitialFormValues,
} from '../entities/alert-manager.util';

export function AlertManagerContainer() {
  const { setAlert } = useAlert();
  const { alerts, currentAlertId } = useAlertManagerContext();
  const [currentAlert, setCurrentAlert] = useState<AlertInfo | null>(null);
  const [initialValues, setInitialValues] = useState<AlertUpdateFormParams>(
    getInitialFormValues(currentAlert)
  );
  const alertUpdateState: ApiState | null = useObservable<ApiState>(
    alertManagerFacade.alertUpdateState$
  );
  const alertUpdateStateRef = useApiStateReference(alertUpdateState);
  const { isCompleted, wasPending, isPending, isFailed, getError } = alertUpdateStateRef;

  useEffect(() => {
    const alert: AlertInfo | null =
      alerts != null && currentAlertId != null
        ? getAlertById(alerts, currentAlertId)
        : null;
    setCurrentAlert(alert);
    setInitialValues(getInitialFormValues(alert));
  }, [alerts, currentAlertId]);

  useEffect(() => {
    if (isCompleted() && wasPending()) {
      const message = `Alert ${currentAlertId} has been updated`;
      setAlert({ isShown: true, type: AlertType.Success, duration: 1200, message });
    }
    if (isFailed()) {
      setAlert({ isShown: true, message: getError() || 'Alert update failed' });
    }
  }, [alertUpdateState, currentAlertId, setAlert]);

  function handleSubmit(values: AlertUpdateFormParams) {
    currentAlertId &&
      alertManagerFacade.updateAlert(currentAlertId, getAlertUpdateParams(values));
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
