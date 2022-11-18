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
  clearDeletedUserId: () => void;
  deleteUser: (userId: number) => void;
  resetApiState: () => void;
}

export function DeleteUserViewModel(userFacade: UserFacade): DeleteUserViewModelResult {
  const apiState: ApiState | null = useObservable(userFacade.usersWriteState$);
  const apiStateRef: ApiStateReference = useApiStateReference(apiState);
  const deleteUserId: number | null = useObservable(userFacade.currentUserId$);

  function deleteUser(userId: number) {
    userFacade.deleteUser(userId, true);
  }

  function clearDeletedUserId() {
    userFacade.clearCurrentUserId();
  }

  function resetApiState() {
    userFacade.resetWriteState();
  }

  return {
    deleteUser,
    deleteUserId,
    clearDeletedUserId,
    resetApiState,
    apiState,
    apiStateRef,
  };
}
