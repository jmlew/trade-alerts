import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

import { ApiRequestType, useApiStateManager } from '@trade-alerts/shared/data-access';
import {
  CreateUserResponse,
  User,
  UserDetails,
  userFacade,
} from '@trade-alerts/users/domain';

import { UserDataHook } from './user-hooks.model';

interface UserCreatorHook extends UserDataHook {
  createUser: (params: UserDetails) => void;
}

export function useUserCreator(): UserCreatorHook {
  const { apiState, stateManager } = useApiStateManager();
  const [user, setUser] = useState<User>();
  const { onCompleted, onFailed, onPending } = stateManager;

  function createUser(params: UserDetails) {
    const request: ApiRequestType = ApiRequestType.Create;
    onPending(request);
    userFacade
      .createUser(params)
      .then((res: AxiosResponse<CreateUserResponse>) => {
        setUser(res.data);
        onCompleted(request);
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        onFailed(message, request);
      });
  }
  return { user, createUser, apiState, stateManager };
}
