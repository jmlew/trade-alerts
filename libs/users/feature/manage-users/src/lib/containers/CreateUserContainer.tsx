import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '@trade-alerts/shared/feature/notification';
import { Loading, NotificationType } from '@trade-alerts/shared/ui-common';
import { UserDetailsForm } from '@trade-alerts/users/ui';
import { getUserFormParams } from '@trade-alerts/users/util';

import { CreateUserViewModel as useVM } from './CreateUserViewModel';

export function CreateUserContainer() {
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const { user, createUser, apiState, apiStateManager } = useVM();
  const { getError, isCompleted, isFailed, isPending } = apiStateManager;

  useEffect(() => {
    if (isCompleted() && user != null) {
      const message = `User ${user.firstName} ${user.lastName} has been created`;
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
      <UserDetailsForm
        onSubmit={createUser}
        onCancel={goToList}
        initialValues={getUserFormParams()}
      />
    </>
  );
}
