import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '@trade-alerts/shared/feature/notification';
import {
  ErrorMessage,
  GenericMessagePanel,
  Loading,
  NotificationType,
} from '@trade-alerts/shared/ui-common';
import { UsersList } from '@trade-alerts/users/ui';

import { DeleteUserViewModel as useDeleteUserVM } from './DeleteUserViewModel';
import { LoadUsersViewModel as useLoadUsersVM } from './LoadUsersViewModel';

interface UserContainerProps {
  pageIndex: number;
}

export function UsersListContainer({ pageIndex }: UserContainerProps) {
  const navigate = useNavigate();
  const { setNotification } = useNotification();
  const { users, loadUsers, loadState, loadStateRef } = useLoadUsersVM(pageIndex);
  const { deleteUserId, deleteUser, deleteState, deleteStateRef } = useDeleteUserVM();

  // Handle upates to load users state.
  useEffect(() => {
    const { isInit, isFailed, wasPending, getError } = loadStateRef;
    if (isInit()) {
      loadUsers();
    }
    if (wasPending() && isFailed()) {
      const message = getError() || 'Load users failed';
      setNotification({ isShown: true, message });
    }
  }, [loadState]);

  // Handle upates to delete user state.
  useEffect(() => {
    const { isCompleted, isFailed, wasPending, getError } = deleteStateRef;
    if (wasPending() && isCompleted()) {
      setNotification({
        isShown: true,
        message: `User ${deleteUserId} has been deleted`,
        type: NotificationType.Success,
      });
    }
    if (wasPending() && isFailed()) {
      setNotification({ isShown: true, message: getError() || 'Delete user failed' });
    }
  }, [deleteState]);

  function editUser(userId: number) {
    navigate(`${userId}`);
  }

  const { isCompleted, wasPending, wasCompleted, isFailed, getError } = loadStateRef;
  const isReady: boolean = isCompleted() && (wasPending() || wasCompleted());
  if (loadStateRef.isPending() || deleteStateRef.isPending()) {
    return <Loading />;
  } else {
    return (
      <>
        {isFailed() && <ErrorMessage>{getError()}</ErrorMessage>}
        {isReady &&
          (users?.length ? (
            <UsersList users={users} onEditUser={editUser} onDeleteUser={deleteUser} />
          ) : (
            <GenericMessagePanel>Add a user to get started.</GenericMessagePanel>
          ))}
      </>
    );
  }
}
