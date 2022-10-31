import { useState } from 'react';
import { take } from 'rxjs';

import {
  ApiStateManagerHook,
  useApiStateManager,
} from '@trade-alerts/shared/data-access';
import { userFacade } from '@trade-alerts/users/domain';

interface Props extends ApiStateManagerHook {
  userId: number | undefined;
  deleteUser: (userId: number) => void;
}

export function DeleteUserViewModel(): Props {
  const { apiState, apiStateManager } = useApiStateManager();
  const [userId, setUserId] = useState<number>();
  const { onCompleted, onFailed, onPending } = apiStateManager;

  function deleteUser(userId: number) {
    onPending();
    userFacade
      .deleteUser(userId)
      .pipe(take(1))
      .subscribe({
        next: (id: number) => {
          setUserId(id);
          onCompleted();
        },
        error: onFailed,
      });
  }

  return { userId, deleteUser, apiState, apiStateManager };
}
