import { useState } from 'react';
import { take } from 'rxjs';

import {
  ApiStateManagerHook,
  useApiStateManager,
} from '@trade-alerts/shared/data-access';
import { User, UserRecord, userFacade } from '@trade-alerts/users/domain';

interface Props extends ApiStateManagerHook {
  user: UserRecord | undefined;
  loadUser: (userId: number) => void;
}

export function LoadUserViewModel(): Props {
  const { apiState, apiStateManager } = useApiStateManager();
  const [user, setUser] = useState<UserRecord>();
  const { onCompleted, onFailed, onPending } = apiStateManager;

  function loadUser(userId: number) {
    onPending();
    userFacade
      .getUser(userId)
      .pipe(take(1))
      .subscribe({
        next: (user: User) => {
          setUser(user);
          onCompleted();
        },
        error: onFailed,
      });
  }

  return { user, loadUser, apiState, apiStateManager };
}
