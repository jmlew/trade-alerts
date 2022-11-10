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
  clearCurrentUser: () => void;
  resetApiState: () => void;
}

export function CreateUserViewModel(userFacade: UserFacade): CreateUserViewModelResult {
  const user: User | null = useObservable<User | null>(userFacade.currentUser$);
  const apiState: ApiState | null = useObservable<ApiState>(userFacade.usersWriteState$);
  const apiStateRef: ApiStateReference = useApiStateReference(apiState);
  const formParams: UserDetails = getUserFormParams();

  function createUser(params: UserDetails) {
    userFacade.createUser(params);
  }

  function clearCurrentUser() {
    userFacade.clearCurrentUser();
  }

  function resetApiState() {
    userFacade.resetWriteState();
  }

  return {
    user,
    formParams,
    createUser,
    clearCurrentUser,
    resetApiState,
    apiState,
    apiStateRef,
  };
}
