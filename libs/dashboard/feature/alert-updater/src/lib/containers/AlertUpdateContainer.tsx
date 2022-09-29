import { useEffect, useState } from 'react';

import { Typography } from '@mui/material';
import {
  AlertInfo,
  dashboardDataFacade,
  getAlertById,
} from '@trade-alerts/dashboard/domain';
import {
  ApiState,
  ApiStateReference,
  useApiStateReference,
} from '@trade-alerts/shared/data-access';
import { useAlert } from '@trade-alerts/shared/feature-alert';
import { AlertType } from '@trade-alerts/shared/ui-common';
import { useObservable } from '@trade-alerts/shared/util-common';

import { AlertUpdateForm } from '../components/AlertUpdateForm';
import { useAlertUpdaterContext } from '../context/alert-updater.context';
import { AlertUpdateFormParams } from '../entities/alert-updater.model';
import {
  getAlertUpdateParams,
  getInitialFormValues,
} from '../entities/alert-updater.util';

export function AlertUpdateContainer() {
  const { setAlert } = useAlert();
  const { alerts, currentAlertId, setDrawerOpen } = useAlertUpdaterContext();
  const alertUpdateState: ApiState | undefined = useObservable<ApiState>(
    dashboardDataFacade.alertUpdateState$
  );
  const updateStateReference: ApiStateReference = useApiStateReference(alertUpdateState);
  const [currentAlert, setCurrentAlert] = useState<AlertInfo | null>(null);
  const [initialValues, setInitialValues] = useState<AlertUpdateFormParams>(
    getInitialFormValues(currentAlert)
  );

  useEffect(() => {
    const alert: AlertInfo | null =
      alerts != null && currentAlertId != null
        ? getAlertById(alerts, currentAlertId)
        : null;
    setCurrentAlert(alert);
    setInitialValues(getInitialFormValues(alert));
  }, [alerts, currentAlertId]);

  useEffect(() => {
    if (updateStateReference.isCompleted() && updateStateReference.wasPending()) {
      const message = `Alert ${currentAlertId} has been updated`;
      setAlert({ isShown: true, type: AlertType.Success, duration: 1200, message });
    }
  }, [updateStateReference, currentAlertId, setAlert]);

  function handleSubmit(values: AlertUpdateFormParams) {
    currentAlertId &&
      dashboardDataFacade.updateAlert(currentAlertId, getAlertUpdateParams(values));
  }

  function handleCancel() {
    setDrawerOpen(false);
  }

  return currentAlert != null ? (
    <AlertUpdateForm
      initialValues={initialValues}
      isPending={updateStateReference.isPending()}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  ) : (
    <Typography variant="body1" color="primary.main">
      Select an Alert
    </Typography>
  );
}
