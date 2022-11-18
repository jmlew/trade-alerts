import { useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '@trade-alerts/shared/feature/notification';
import {
  ErrorMessage,
  GenericMessagePanel,
  Loading,
  NotificationType,
} from '@trade-alerts/shared/ui-common';
import { userFacade } from '@trade-alerts/users/domain';
import { UsersList } from '@trade-alerts/users/ui';

import { DeleteUserViewModel as useDeleteUserVM } from './DeleteUserViewModel';
import { LoadUsersViewModel as useLoadUsersVM } from './LoadUsersViewModel';

export function UsersListContainer() {
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const {
    users,
    loadUsers,
    apiState: loadState,
    apiStateRef: loadStateRef,
  } = useLoadUsersVM(userFacade);
  const {
    deleteUser,
    deleteUserId,
    clearDeletedUserId,
    resetApiState: resetDeleteState,
    apiState: deleteState,
    apiStateRef: deleteStateRef,
  } = useDeleteUserVM(userFacade);

  // Handle upates to load users state.
  useLayoutEffect(() => {
    return () => {
      resetDeleteState();
      clearDeletedUserId();
    };
  }, []);

  useEffect(() => {
    const { isIdle, isFailed, getError } = loadStateRef;
    if (isIdle()) {
      loadUsers();
    }
    if (isFailed()) {
      const message = getError() || 'Load users failed';
      setNotification({ isShown: true, message });
    }
  }, [loadState]);

  // Handle upates to delete user state.
  useEffect(() => {
    const { isCompleted, isFailed, getError } = deleteStateRef;
    if (isCompleted() && deleteUserId != null) {
      setNotification({
        isShown: true,
        message: `User ${deleteUserId} has been deleted`,
        type: NotificationType.Success,
      });
      clearDeletedUserId();
    }
    if (isFailed()) {
      setNotification({ isShown: true, message: getError() || 'Delete user failed' });
    }
  }, [deleteState, deleteUserId]);

  function editUser(userId: number) {
    navigate(`${userId}`);
  }

  const { isCompleted, isFailed, getError } = loadStateRef;
  if (loadStateRef.isPending() || deleteStateRef.isPending()) {
    return <Loading />;
  } else {
    return (
      <>
        {isFailed() && <ErrorMessage>{getError()}</ErrorMessage>}
        {isCompleted() &&
          (users?.length ? (
            <UsersList users={users} onEditUser={editUser} onDeleteUser={deleteUser} />
          ) : (
            <GenericMessagePanel>Add a user to get started.</GenericMessagePanel>
          ))}
      </>
    );
  }
}
