import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '@trade-alerts/shared/feature/notification';
import { ErrorMessage, Loading, NotificationType } from '@trade-alerts/shared/ui-common';
import { UsersList } from '@trade-alerts/users/ui';

import { DeleteUserViewModel as useDeleteUserVM } from './DeleteUserViewModel';
import { LoadUsersViewModel as useLoadUsersVM } from './LoadUsersViewModel';

interface UserContainerProps {
  pageIndex: number;
}

export function UsersListContainer({ pageIndex }: UserContainerProps) {
  const navigate = useNavigate();
  const { setNotification } = useNotification();

  const {
    users,
    loadUsers,
    apiState: loadState,
    apiStateManager: loadStateManager,
  } = useLoadUsersVM(pageIndex);

  const {
    userId,
    deleteUser,
    apiState: deleteState,
    apiStateManager: deleteStateManager,
  } = useDeleteUserVM();

  useEffect(() => {
    if (loadStateManager.isInit()) {
      loadUsers();
    }
    if (loadStateManager.isFailed()) {
      const message = loadStateManager.getError() || 'Load users failed';
      setNotification({ isShown: true, message });
    }
  }, [loadState]);

  useEffect(() => {
    if (deleteStateManager.isCompleted()) {
      const message = `User ${userId} has been deleted`;
      setNotification({ isShown: true, message, type: NotificationType.Success });
      loadUsers();
    }
    if (deleteStateManager.isFailed()) {
      const message = deleteStateManager.getError() || 'Delete user failed';
      setNotification({ isShown: true, message });
    }
  }, [deleteState]);

  function editUser(userId: number) {
    navigate(`${userId}`);
  }

  const { isCompleted, wasPending, wasCompleted, isFailed, getError } = loadStateManager;
  const isReady: boolean = isCompleted() && (wasPending() || wasCompleted());
  if (loadStateManager.isPending() || deleteStateManager.isPending()) {
    return <Loading />;
  } else {
    return (
      <>
        {isFailed() && <ErrorMessage>{getError()}</ErrorMessage>}
        {isReady && users != null && (
          <UsersList users={users} onEditUser={editUser} onDeleteUser={deleteUser} />
        )}
      </>
    );
  }
}
