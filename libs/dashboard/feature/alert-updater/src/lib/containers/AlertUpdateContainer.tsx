import { useState } from 'react';

import { Typography } from '@mui/material';
import { useAlert } from '@trade-alerts/shared/feature-alert';
import { AlertType } from '@trade-alerts/shared/ui-common';

import { AlertUpdateForm } from '../components/AlertUpdateForm';
import { useAlertUpdaterContext } from '../context/alert-updater.context';
import { AlertUpdateFormParams } from '../entities/alert-updater.model';
import {
  getAlertActionLabel,
  getInitialFormValues,
} from '../entities/alert-updater.util';

export function AlertUpdateContainer() {
  const { setAlert } = useAlert();
  const { currentAlert, setDrawerOpen } = useAlertUpdaterContext();
  const [isPending, setIsPending] = useState(false);

  function handleSubmit(values: AlertUpdateFormParams) {
    // TODO: implement CRUD and handle errors.
    setIsPending(true);
    setTimeout(() => {
      const message = `Alert ${
        currentAlert?.alertID
      } has been updated to ${getAlertActionLabel(values.action)}`;
      setAlert({ isShown: true, type: AlertType.Success, message });
      setIsPending(false);
    }, 700);
  }

  function handleCancel() {
    setDrawerOpen(false);
  }

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
