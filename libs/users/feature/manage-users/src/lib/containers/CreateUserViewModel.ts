import {
  ApiState,
  ApiStateReference,
  useApiStateReference,
} from '@trade-alerts/shared/data-access';
import { useObservable } from '@trade-alerts/shared/util-common';
import { User, UserDetails, userFacade } from '@trade-alerts/users/domain';

interface Props {
  createdUser: User | null;
  createState: ApiState | null;
  createStateRef: ApiStateReference;
  createUser: (params: UserDetails) => void;
  clearCurrentUser: () => void;
  resetCreate: () => void;
}

export function CreateUserViewModel(): Props {
  const createdUser: User | null = useObservable<User | null>(userFacade.currentUser$);
  const createState: ApiState | null = useObservable<ApiState>(
    userFacade.usersWriteState$
  );
  const createStateRef: ApiStateReference = useApiStateReference(createState);

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
    createdUser,
    createUser,
    clearCurrentUser,
    resetCreate,
    createState,
    createStateRef,
  };
}
