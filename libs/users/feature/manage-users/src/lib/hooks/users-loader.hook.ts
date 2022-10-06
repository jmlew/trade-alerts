import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

import { ApiRequestType, useApiStateManager } from '@trade-alerts/shared/data-access';
import { objectsSortOnKey } from '@trade-alerts/shared/util-common';
import { GetUsersResponse, User, userFacade } from '@trade-alerts/users/domain';

import { UsersDataHook } from './user-hooks.model';

interface UserwLoaderHook extends UsersDataHook {
  getUsers: () => void;
}

export function useUsersLoader(pageIndex: number): UserwLoaderHook {
  const { apiState, stateManager } = useApiStateManager();
  const [users, setUsers] = useState<User[]>();
  const { onCompleted, onFailed, onPending } = stateManager;

  function getUsers() {
    const request: ApiRequestType = ApiRequestType.Read;
    onPending(request);
    userFacade
      .getUsers(pageIndex)
      .then((res: AxiosResponse<GetUsersResponse>) => {
        const items: User[] = objectsSortOnKey(res.data.data, 'firstName');
        setUsers(items);
        onCompleted(request);
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        onFailed(message, request);
      });
  }

  return { users, getUsers, apiState, stateManager };
}
