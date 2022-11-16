import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '@trade-alerts/shared/feature/notification';
import {
  ErrorMessageWithButton,
  Loading,
  NotificationType,
} from '@trade-alerts/shared/ui-common';
import { userFacade } from '@trade-alerts/users/domain';
import { UserDetailsForm } from '@trade-alerts/users/ui';

import { UpdateUserViewModel as useVM } from './UpdateUserViewModel';

export function UpdateUserContainer() {
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const { user, formParams, updateUser, resetApiState, apiState, apiStateRef } =
    useVM(userFacade);
  const { getError, isCompleted, isFailed, isPending } = apiStateRef;

  useEffect(() => {
    if (isCompleted() && user != null) {
      const message = `User ${user.id} has been updated`;
      setNotification({ isShown: true, message, type: NotificationType.Success });
      goToList();
    }
    if (isFailed()) {
      const message = getError() || 'Update failed';
      setNotification({ isShown: true, message });
    }
  }, [apiState, user]);

  useLayoutEffect(() => {
    return () => resetApiState();
  }, []);

  function goToList() {
    navigate(`/users`);
  }

  return (
    <>
      {isPending() && <Loading />}
      {user != null ? (
        <UserDetailsForm
          user={user}
          onSubmit={updateUser}
          onCancel={goToList}
          initialValues={formParams}
        />
      ) : (
        <ErrorMessageWithButton label="Go to Users" onClick={goToList}>
          User does not exist
        </ErrorMessageWithButton>
      )}
    </>
  );
}
