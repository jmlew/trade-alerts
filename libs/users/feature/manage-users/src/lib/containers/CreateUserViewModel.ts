import {
  ApiState,
  ApiStateReference,
  useApiStateReference,
} from '@trade-alerts/shared/data-access';
import { useObservable } from '@trade-alerts/shared/util-common';
import { User, UserDetails, UserFacade } from '@trade-alerts/users/domain';

import { getUserFormParams } from '../entities/user-params.utils';

interface ViewModel {
  user: User | null;
  formParams: UserDetails;
  createState: ApiState | null;
  createStateRef: ApiStateReference;
  createUser: (params: UserDetails) => void;
  clearCurrentUser: () => void;
  resetCreate: () => void;
}

export function CreateUserViewModel(userFacade: UserFacade): ViewModel {
  const user: User | null = useObservable<User | null>(userFacade.currentUser$);
  const createState: ApiState | null = useObservable<ApiState>(
    userFacade.usersWriteState$
  );
  const createStateRef: ApiStateReference = useApiStateReference(createState);
  const formParams: UserDetails = getUserFormParams();

  function createUser(params: UserDetails) {
    userFacade.createUser(params);
  }

  function clearCurrentUser() {
    userFacade.clearCurrentUser();
  }

  function resetCreate() {
    userFacade.resetWriteState();
  }

  return {
    user,
    formParams,
    createUser,
    clearCurrentUser,
    resetCreate,
    createState,
    createStateRef,
  };
}
