import {
  ApiState,
  ApiStateReference,
  useApiStateReference,
} from '@trade-alerts/shared/data-access';
import { useObservable } from '@trade-alerts/shared/util-common';
import { User, UserDetails, UserFacade } from '@trade-alerts/users/domain';

import { getUserFormParams } from '../entities/user-params.utils';

export interface CreateUserViewModelResult {
  user: User | null;
  formParams: UserDetails;
  apiState: ApiState | null;
  apiStateRef: ApiStateReference;
  createUser: (params: UserDetails) => void;
  clearCurrentUserId: () => void;
  resetApiState: () => void;
}

export function CreateUserViewModel(userFacade: UserFacade): CreateUserViewModelResult {
  const user: User | null = useObservable(userFacade.currentUser$);
  const apiState: ApiState | null = useObservable(userFacade.usersWriteState$);
  const apiStateRef: ApiStateReference = useApiStateReference(apiState);
  const formParams: UserDetails = getUserFormParams(null);

  function createUser(params: UserDetails) {
    userFacade.createUser(params);
  }

  function clearCurrentUserId() {
    userFacade.clearCurrentUserId();
  }

  function resetApiState() {
    userFacade.resetWriteState();
  }

  return {
    user,
    formParams,
    createUser,
    clearCurrentUserId,
    resetApiState,
    apiState,
    apiStateRef,
  };
}
