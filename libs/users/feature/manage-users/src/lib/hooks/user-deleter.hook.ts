import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';

import { ApiRequestType, useApiStateManager } from '@trade-alerts/shared/data-access';
import { UserDetails, userFacade } from '@trade-alerts/users/domain';

import { useUserContext } from '../context/user.context';
import { ApiStateHook, UserDataHook } from './user-hooks.model';

interface UserDeleterHook extends ApiStateHook {
  userId: number | undefined;
  deleteUser: (userId: number) => void;
}

export function useUserDeleter(): UserDeleterHook {
  const { apiState, stateManager } = useApiStateManager();
  const [userId, setUserId] = useState<number>();
  const { onCompleted, onFailed, onPending } = stateManager;

  function deleteUser(userId: number) {
    const request: ApiRequestType = ApiRequestType.Delete;
    onPending(request);
    userFacade
      .deleteUser(userId)
      .then((res: AxiosResponse<number>) => {
        setUserId(userId);
        onCompleted(request);
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        onFailed(message, request);
      });
  }

  return { userId, deleteUser, apiState, stateManager };
}
