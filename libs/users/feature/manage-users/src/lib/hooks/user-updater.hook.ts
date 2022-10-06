import { AxiosError } from 'axios';

import { ApiRequestType, useApiStateManager } from '@trade-alerts/shared/data-access';
import { UserDetails, userFacade } from '@trade-alerts/users/domain';

import { useUserContext } from '../context/user.context';
import { UserDataHook } from './user-hooks.model';

interface UserUpdaterHook extends UserDataHook {
  updateUser: (values: UserDetails) => void;
}

export function useUserUpdater(): UserUpdaterHook {
  const { apiState, stateManager } = useApiStateManager();
  const { onCompleted, onFailed, onPending } = stateManager;
  const { user } = useUserContext();

  function updateUser(values: UserDetails) {
    const userId: number = user.id;
    const request: ApiRequestType = ApiRequestType.Update;
    onPending(request);
    userFacade
      .updateUser(userId, values)
      .then(() => {
        onCompleted(request);
      })
      .catch((error: AxiosError) => {
        const { message } = error;
        onFailed(message, request);
      });
  }

  return { user, updateUser, apiState, stateManager };
}
