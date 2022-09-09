import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiRequestType, useApiStateManager } from '@kdb-dash/shared/data-access';
import { useAlert } from '@kdb-dash/shared/feature-alert';
import { AlertType, ErrorMessage, Loading } from '@kdb-dash/shared/ui-common';
import { objectsSortOnKey } from '@kdb-dash/shared/util-common';
import { GetUsersResponse, User, userFacade } from '@kdb-dash/users/domain';
import { UsersList } from '@kdb-dash/users/ui';

interface UserContainerProps {
  pageIndex: number;
}

export function UsersListContainer({ pageIndex }: UserContainerProps) {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState<User[]>();
  const { setAlert } = useAlert();
  const { stateManager } = useApiStateManager();
  const {
    getError,
    isCompleted,
    isFailed,
    isInit,
    isPending,
    onCompleted,
    onFailed,
    onPending,
    wasPending,
    wasCompleted,
  } = stateManager;

  // Handle changes in status for API load and delete requests.
  useEffect(() => {
    if (isInit()) {
      getUsers();
    }
  }, []);

  function getUsers() {
    const request: ApiRequestType = ApiRequestType.Read;
    onPending(request);
    userFacade
      .getUsers(pageIndex)
      .then((res: AxiosResponse<GetUsersResponse>) => {
        const items: User[] = objectsSortOnKey(res.data.data, 'firstName');
        setUsersData(items);
        onCompleted(request);
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        onFailed(message, request);
        setAlert({ isShown: true, message });
      });
  }

  function handleDeleteUser(userId: number) {
    const request: ApiRequestType = ApiRequestType.Delete;
    onPending(request);
    userFacade
      .deleteUser(userId)
      .then((res: AxiosResponse<number>) => {
        setAlert({
          isShown: true,
          message: `User ${userId} has been deleted`,
          type: AlertType.Success,
        });
        getUsers();
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        onFailed(message, request);
        setAlert({ isShown: true, message });
      });
  }

  function handleEditUser(userId: number) {
    navigate(`${userId}`);
  }

  const isDataReady: boolean = isCompleted() && (wasPending() || wasCompleted());

  if (isPending()) {
    return <Loading />;
  } else {
    return (
      <>
        {isFailed() && <ErrorMessage>{getError()}</ErrorMessage>}
        {isDataReady && usersData != null && (
          <UsersList
            users={usersData}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        )}
      </>
    );
  }
}
