import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '@trade-alerts/shared/feature/notification';
import { Loading, NotificationType } from '@trade-alerts/shared/ui-common';
import { userFacade } from '@trade-alerts/users/domain';
import { UserDetailsForm } from '@trade-alerts/users/ui';

import { CreateUserViewModel as useVM } from './CreateUserViewModel';

export function CreateUserContainer() {
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const {
    user,
    formParams,
    createUser,
    clearCurrentUser,
    resetApiState,
    apiState,
    apiStateRef,
  } = useVM(userFacade);
  const { getError, isCompleted, isFailed, isPending } = apiStateRef;

  useEffect(() => {
    if (isCompleted() && user != null) {
      setNotification({
        isShown: true,
        message: `User ${user.firstName} ${user.lastName} has been created`,
        type: NotificationType.Success,
      });
      clearCurrentUser();
      goToList();
    }
    if (isFailed()) {
      setNotification({ isShown: true, message: getError() || 'Update failed' });
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
      <UserDetailsForm
        onSubmit={createUser}
        onCancel={goToList}
        initialValues={formParams}
      />
    </>
  );
}
