import {
  ApiState,
  ApiStateReference,
  useApiStateReference,
} from '@trade-alerts/shared/data-access';
import { useObservable } from '@trade-alerts/shared/util-common';
import { UserDetails, UserFacade, UserRecord } from '@trade-alerts/users/domain';

import { useUserContext } from '../context/user.context';
import { getUserFormParams } from '../entities/user-params.utils';

export interface UpdateUserViewModelResult {
  user: UserRecord;
  formParams: UserDetails;
  apiState: ApiState | null;
  apiStateRef: ApiStateReference;
  updateUser: (values: UserDetails) => void;
  resetApiState: () => void;
}

export function UpdateUserViewModel(userFacade: UserFacade): UpdateUserViewModelResult {
  const { user } = useUserContext();
  const apiState: ApiState | null = useObservable<ApiState>(userFacade.usersWriteState$);
  const apiStateRef: ApiStateReference = useApiStateReference(apiState);
  const formParams: UserDetails = getUserFormParams(user);

  function updateUser(values: UserDetails) {
    userFacade.updateUser(user.id, values, true);
  }

  function resetApiState() {
    userFacade.resetWriteState();
  }

  return { user, formParams, updateUser, resetApiState, apiState, apiStateRef };
}
