import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '@trade-alerts/shared/feature/notification';
import { Loading, NotificationType } from '@trade-alerts/shared/ui-common';
import { UserDetailsForm } from '@trade-alerts/users/ui';
import { getUserFormParams } from '@trade-alerts/users/util';

import { UpdateUserViewModel as useVM } from './UpdateUserViewModel';

export function UpdateUserContainer() {
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const { user, updateUser, resetUpdate, updateState, updateStateRef } = useVM();
  const { getError, isCompleted, isFailed, isPending } = updateStateRef;

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
  }, [updateState, user]);

  useLayoutEffect(() => {
    return () => resetUpdate();
  }, []);

  function goToList() {
    navigate(`/users`);
  }

  return (
    <>
      {isPending() && <Loading />}
      {
        <UserDetailsForm
          user={user}
          onSubmit={updateUser}
          onCancel={goToList}
          initialValues={getUserFormParams(user)}
        />
      }
    </>
  );
}
