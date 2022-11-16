import {
  ApiState,
  ApiStateReference,
  useApiStateReference,
} from '@trade-alerts/shared/data-access';
import { useObservable } from '@trade-alerts/shared/util-common';
import { User, UserDetails, UserFacade } from '@trade-alerts/users/domain';

import { getUserFormParams } from '../entities/user-params.utils';

export interface UpdateUserViewModelResult {
  user: User | null;
  formParams: UserDetails;
  apiState: ApiState | null;
  apiStateRef: ApiStateReference;
  updateUser: (values: UserDetails) => void;
  resetApiState: () => void;
}

export function UpdateUserViewModel(userFacade: UserFacade): UpdateUserViewModelResult {
  const user: User | null = useObservable<User | null>(userFacade.currentUser$);
  const apiState: ApiState | null = useObservable<ApiState>(userFacade.usersWriteState$);
  const apiStateRef: ApiStateReference = useApiStateReference(apiState);
  const formParams: UserDetails = getUserFormParams(user);

  function updateUser(values: UserDetails) {
    user != null && userFacade.updateUser(user.id, values, true);
  }

  function resetApiState() {
    userFacade.resetWriteState();
  }

  return { user, formParams, updateUser, resetApiState, apiState, apiStateRef };
}
