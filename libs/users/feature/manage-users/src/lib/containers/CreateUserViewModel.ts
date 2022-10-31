import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { take } from 'rxjs';

import {
  ApiStateManagerHook,
  useApiStateManager,
} from '@trade-alerts/shared/data-access';
import {
  CreateUserResponse,
  User,
  UserDetails,
  UserRecord,
  userFacade,
} from '@trade-alerts/users/domain';

interface Props extends ApiStateManagerHook {
  user: UserRecord | undefined;
  createUser: (params: UserDetails) => void;
}

export function CreateUserViewModel(): Props {
  const { apiState, apiStateManager } = useApiStateManager();
  const [user, setUser] = useState<UserRecord>();
  const { onCompleted, onFailed, onPending } = apiStateManager;

  function createUser(params: UserDetails) {
    onPending();
    userFacade
      .createUser(params)
      .pipe(take(1))
      .subscribe({
        next: (user: User) => {
          setUser(user);
          onCompleted();
        },
        error: onFailed,
      });
  }
  return { user, createUser, apiState, apiStateManager };
}
