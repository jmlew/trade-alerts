import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '@trade-alerts/shared/feature/notification';
import { Loading, NotificationType } from '@trade-alerts/shared/ui-common';
import { UserDetailsForm } from '@trade-alerts/users/ui';
import { getUserFormParams } from '@trade-alerts/users/util';

import { useUserUpdater } from '../hooks/user-updater.hook';

export function UpdateUserContainer() {
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const { user, updateUser, apiState, stateManager } = useUserUpdater();
  const { getError, isCompleted, isFailed, isPending } = stateManager;

  useEffect(() => {
    if (isCompleted() && user != null) {
      const userId: number = user.id;
      const message = `User ${userId} has been updated`;
      setNotification({ isShown: true, message, type: NotificationType.Success });
      goToList();
    }
    if (isFailed()) {
      const message = getError() || 'Update failed';
      setNotification({ isShown: true, message });
    }
  }, [apiState, user]);

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
