import { useState } from 'react';
import { take } from 'rxjs';

import {
  ApiStateManagerHook,
  useApiStateManager,
} from '@trade-alerts/shared/data-access';
import { User, userFacade } from '@trade-alerts/users/domain';

interface Props extends ApiStateManagerHook {
  users: User[] | undefined;
  loadUsers: () => void;
}

export function LoadUsersViewModel(pageIndex: number): Props {
  const { apiState, apiStateManager } = useApiStateManager();
  const [users, setUsers] = useState<User[]>();
  const { onCompleted, onFailed, onPending } = apiStateManager;

  function loadUsers() {
    onPending();
    userFacade
      .getUsers(pageIndex)
      .pipe(take(1))
      .subscribe({
        next: (users: User[]) => {
          setUsers(users);
          onCompleted();
        },
        error: onFailed,
      });
  }

  return { users, loadUsers, apiState, apiStateManager };
}
