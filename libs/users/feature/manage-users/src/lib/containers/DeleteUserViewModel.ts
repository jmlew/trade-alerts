import {
  ApiState,
  ApiStateReference,
  useApiStateReference,
} from '@trade-alerts/shared/data-access';
import { useObservable } from '@trade-alerts/shared/util-common';
import { UserFacade } from '@trade-alerts/users/domain';

export interface DeleteUserViewModelResult {
  deleteUserId: number | null;
  clearDeleteUserId: () => void;
  apiState: ApiState | null;
  apiStateRef: ApiStateReference;
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

  function clearDeleteUserId() {
    userFacade.clearCurrentUser();
  }

  function resetApiState() {
    userFacade.resetWriteState();
  }

  return {
    deleteUserId,
    clearDeleteUserId,
    deleteUser,
    resetApiState,
    apiState,
    apiStateRef,
  };
}
