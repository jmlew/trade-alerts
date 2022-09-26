import { useState } from 'react';

import { useAlert } from '@kdb-dash/shared/feature-alert';
import { AlertType } from '@kdb-dash/shared/ui-common';

import { AlertUpdateForm } from '../components/AlertUpdateForm';
import { useAlertUpdaterContext } from '../context/alert-updater.context';
import { AlertUpdateFormParams } from '../entities/alert-updater.model';
import {
  getAlertActionLabel,
  getInitialFormValues,
} from '../entities/alert-updater.util';

export function AlertUpdateContainer() {
  const { setAlert } = useAlert();
  const [initialValues, setInitialValues] = useState(getInitialFormValues());
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
      resetFormValues();
      setIsPending(false);
    }, 800);
  }

  function handleCancel() {
    resetFormValues();
    setDrawerOpen(false);
  }

  function resetFormValues() {
    setInitialValues(getInitialFormValues());
  }

  return (
    <AlertUpdateForm
      initialValues={initialValues}
      isPending={isPending}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
