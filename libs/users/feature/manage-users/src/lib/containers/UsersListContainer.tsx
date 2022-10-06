import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAlert } from '@trade-alerts/shared/feature-alert';
import { AlertType, ErrorMessage, Loading } from '@trade-alerts/shared/ui-common';
import { UsersList } from '@trade-alerts/users/ui';

import { useUserDeleter } from '../hooks/user-deleter.hook';
import { useUsersLoader } from '../hooks/users-loader.hook';

interface UserContainerProps {
  pageIndex: number;
}

export function UsersListContainer({ pageIndex }: UserContainerProps) {
  const navigate = useNavigate();
  const { setAlert } = useAlert();
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
      setAlert({ isShown: true, message });
    }
  }, [loadState]);

  useEffect(() => {
    if (deleteStateManager.isCompleted()) {
      const message = `User ${userId} has been deleted`;
      setAlert({ isShown: true, message, type: AlertType.Success });
      getUsers();
    }
    if (deleteStateManager.isFailed()) {
      const message = deleteStateManager.getError() || 'Delete user failed';
      setAlert({ isShown: true, message });
    }
  }, [deleteState]);

  function editUser(userId: number) {
    navigate(`${userId}`);
  }

  const { isCompleted, wasPending, wasCompleted, isPending, isFailed, getError } =
    loadStateManager;
  const isReady: boolean = isCompleted() && (wasPending() || wasCompleted());
  if (isPending()) {
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
