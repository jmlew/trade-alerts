import {
  ApiState,
  ApiStateReference,
  useApiStateReference,
} from '@trade-alerts/shared/data-access';
import { useObservable } from '@trade-alerts/shared/util-common';
import { UserDetails, UserRecord, userFacade } from '@trade-alerts/users/domain';

import { useUserContext } from '../context/user.context';

interface Props {
  user: UserRecord;
  updateState: ApiState | null;
  updateStateRef: ApiStateReference;
  updateUser: (values: UserDetails) => void;
  resetUpdate: () => void;
}

export function UpdateUserViewModel(): Props {
  const { user } = useUserContext();
  const updateState: ApiState | null = useObservable<ApiState>(
    userFacade.usersWriteState$
  );
  const updateStateRef: ApiStateReference = useApiStateReference(updateState);

  function updateUser(values: UserDetails) {
    userFacade.updateUser(user.id, values);
  }

  function resetUpdate() {
    userFacade.resetWriteState();
  }

  return { user, updateUser, resetUpdate, updateState, updateStateRef };
}
