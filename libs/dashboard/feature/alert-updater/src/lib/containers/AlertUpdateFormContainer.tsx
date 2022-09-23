import { useState } from 'react';

import { AlertUpdateForm } from '../components/AlertUpdateForm';
import { AlertUpdateFormParams } from '../entities/alert-updater.model';
import { getInitialFormValues } from '../entities/alert-updater.util';

export function AlertUpdateFormContainer() {
  const [initialValues, setInitialValues] = useState(getInitialFormValues());

  const isPending = false;

  function handleSubmit(values: AlertUpdateFormParams) {
    console.log('submitting form ', values);
    resetFormValues();
  }

  function handleCancel() {
    console.log('cancelling form ');
    resetFormValues();
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
