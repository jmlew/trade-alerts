import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

import { ApiRequestType, useApiStateManager } from '@trade-alerts/shared/data-access';
import { GetUserResponse, User, userFacade } from '@trade-alerts/users/domain';

import { UserDataHook } from './user-hooks.model';

interface UserLoaderHook extends UserDataHook {
  loadUser: (userId: number) => void;
}

export function useUserLoader(): UserLoaderHook {
  const { apiState, stateManager } = useApiStateManager();
  const [user, setUser] = useState<User>();
  const { onCompleted, onFailed, onPending } = stateManager;

  function loadUser(userId: number) {
    const request: ApiRequestType = ApiRequestType.Read;
    onPending(request);
    userFacade
      .getUser(userId)
      .then((res: AxiosResponse<GetUserResponse>) => {
        setUser(res.data.data);
        onCompleted(request);
      })
      .catch((error: AxiosError) => onFailed(error.message, request));
  }

  return { user, loadUser, apiState, stateManager };
}