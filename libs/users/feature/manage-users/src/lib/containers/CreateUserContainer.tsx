import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '@trade-alerts/shared/feature/notification';
import { Loading, NotificationType } from '@trade-alerts/shared/ui-common';
import { UserDetailsForm } from '@trade-alerts/users/ui';
import { getUserFormParams } from '@trade-alerts/users/util';

import { CreateUserViewModel as useVM } from './CreateUserViewModel';

export function CreateUserContainer() {
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const {
    createdUser,
    createUser,
    clearCurrentUser,
    resetCreate,
    createState,
    createStateRef,
  } = useVM();
  const { getError, isCompleted, isFailed, isPending } = createStateRef;

  useEffect(() => {
    if (isCompleted() && createdUser != null) {
      setNotification({
        isShown: true,
        message: `User ${createdUser.firstName} ${createdUser.lastName} has been created`,
        type: NotificationType.Success,
      });
      clearCurrentUser();
      goToList();
    }
    if (isFailed()) {
      setNotification({ isShown: true, message: getError() || 'Update failed' });
    }
  }, [createState, createdUser]);

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
        initialValues={getUserFormParams()}
      />
    </>
  );
}
