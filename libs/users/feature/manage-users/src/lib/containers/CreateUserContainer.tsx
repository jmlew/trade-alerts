import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '@trade-alerts/shared/feature/notification';
import { Loading, NotificationType } from '@trade-alerts/shared/ui-common';
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
    resetCreate,
    createState,
    createStateRef,
  } = useVM();
  const { getError, isCompleted, isFailed, isPending } = createStateRef;

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
  }, [createState, user]);

  useLayoutEffect(() => {
    return () => resetCreate();
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
