import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotification } from '@trade-alerts/shared/feature/notification';
import { ErrorMessage, Loading, NotificationType } from '@trade-alerts/shared/ui-common';
import { UsersList } from '@trade-alerts/users/ui';

import { useUserDeleter } from '../hooks/user-deleter.hook';
import { useUsersLoader } from '../hooks/users-loader.hook';

interface UserContainerProps {
  pageIndex: number;
}

export function UsersListContainer({ pageIndex }: UserContainerProps) {
  const navigate = useNavigate();
  const { setNotification } = useNotification();

  const {
    users,
    getUsers,
    apiState: loadState,
    stateManager: loadStateManager,
  } = useUsersLoader(pageIndex);

  const {
    userId,
    deleteUser,
    apiState: deleteState,
    stateManager: deleteStateManager,
  } = useUserDeleter();

  useEffect(() => {
    if (loadStateManager.isInit()) {
      getUsers();
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
      getUsers();
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
