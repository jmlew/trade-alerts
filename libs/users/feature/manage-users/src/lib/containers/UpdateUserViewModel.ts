import {
  ApiState,
  ApiStateReference,
  useApiStateReference,
} from '@trade-alerts/shared/data-access';
import { useObservable } from '@trade-alerts/shared/util-common';
import { UserDetails, UserFacade, UserRecord } from '@trade-alerts/users/domain';

import { useUserContext } from '../context/user.context';
import { getUserFormParams } from '../entities/user-params.utils';

interface ViewModel {
  user: UserRecord;
  formParams: UserDetails;
  updateState: ApiState | null;
  updateStateRef: ApiStateReference;
  updateUser: (values: UserDetails) => void;
  resetUpdate: () => void;
}

export function UpdateUserViewModel(userFacade: UserFacade): ViewModel {
  const { user } = useUserContext();
  const updateState: ApiState | null = useObservable<ApiState>(
    userFacade.usersWriteState$
  );
  const updateStateRef: ApiStateReference = useApiStateReference(updateState);
  const formParams: UserDetails = getUserFormParams(user);

  function updateUser(values: UserDetails) {
    userFacade.updateUser(user.id, values, true);
  }

  function resetUpdate() {
    userFacade.resetWriteState();
  }

  return { user, formParams, updateUser, resetUpdate, updateState, updateStateRef };
}
