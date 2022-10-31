import { take } from 'rxjs';

import {
  ApiStateManagerHook,
  useApiStateManager,
} from '@trade-alerts/shared/data-access';
import { UserDetails, UserRecord, userFacade } from '@trade-alerts/users/domain';

import { useUserContext } from '../context/user.context';

interface Props extends ApiStateManagerHook {
  user: UserRecord;
  updateUser: (values: UserDetails) => void;
}

export function UpdateUserViewModel(): Props {
  const { apiState, apiStateManager } = useApiStateManager();
  const { onCompleted, onFailed, onPending } = apiStateManager;
  const { user } = useUserContext();

  function updateUser(values: UserDetails) {
    const userId: number = user.id;
    onPending();
    userFacade.updateUser(userId, values).pipe(take(1)).subscribe({
      next: onCompleted,
      error: onFailed,
    });
  }

  return { user, updateUser, apiState, apiStateManager };
}
