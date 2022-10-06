import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

import {
  ApiStateManagerHook,
  useApiStateManager,
} from '@trade-alerts/shared/data-access';
import { objectsSortOnKey } from '@trade-alerts/shared/util-common';
import { GetUsersResponse, User, userFacade } from '@trade-alerts/users/domain';

interface UsersLoaderHook extends ApiStateManagerHook {
  users: User[] | undefined;
  getUsers: () => void;
}

export function useUsersLoader(pageIndex: number): UsersLoaderHook {
  const { apiState, stateManager } = useApiStateManager();
  const [users, setUsers] = useState<User[]>();
  const { onCompleted, onFailed, onPending } = stateManager;

  function getUsers() {
    onPending();
    userFacade
      .getUsers(pageIndex)
      .then((res: AxiosResponse<GetUsersResponse>) => {
        const items: User[] = objectsSortOnKey(res.data.data, 'firstName');
        setUsers(items);
        onCompleted();
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        onFailed(message);
      });
  }

  return { users, getUsers, apiState, stateManager };
}
