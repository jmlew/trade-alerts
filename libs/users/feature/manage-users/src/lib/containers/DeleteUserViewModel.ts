import { useState } from 'react';

import {
  ApiState,
  ApiStateReference,
  useApiStateReference,
} from '@trade-alerts/shared/data-access';
import { useObservable } from '@trade-alerts/shared/util-common';
import { UserFacade } from '@trade-alerts/users/domain';

export interface DeleteUserViewModelResult {
  deleteUserId: number | null;
  apiState: ApiState | null;
  apiStateRef: ApiStateReference;
  deleteUser: (userId: number) => void;
  resetApiState: () => void;
}

export function DeleteUserViewModel(userFacade: UserFacade): DeleteUserViewModelResult {
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const apiState: ApiState | null = useObservable<ApiState>(userFacade.usersWriteState$);
  const apiStateRef: ApiStateReference = useApiStateReference(apiState);

  function deleteUser(userId: number) {
    setDeleteUserId(userId);
    userFacade.deleteUser(userId, true);
  }

  function resetApiState() {
    userFacade.resetWriteState();
  }

  return { deleteUserId, deleteUser, resetApiState, apiState, apiStateRef };
}
