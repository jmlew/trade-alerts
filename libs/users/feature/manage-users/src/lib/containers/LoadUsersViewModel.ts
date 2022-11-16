import {
  ApiState,
  ApiStateReference,
  useApiStateReference,
} from '@trade-alerts/shared/data-access';
import { useObservable } from '@trade-alerts/shared/util-common';
import { User, UserFacade } from '@trade-alerts/users/domain';

export interface LoadUsersViewModelResult {
  users: User[] | null;
  apiState: ApiState | null;
  apiStateRef: ApiStateReference;
  loadUsers: () => void;
  resetApiState: () => void;
}

export function LoadUsersViewModel(userFacade: UserFacade): LoadUsersViewModelResult {
  const users: User[] | null = useObservable(userFacade.allUsers$);
  const apiState: ApiState | null = useObservable(userFacade.usersReadState$);
  const apiStateRef: ApiStateReference = useApiStateReference(apiState);

  function loadUsers() {
    userFacade.loadUsers();
  }

  function resetApiState() {
    userFacade.resetReadState();
  }

  return { users, loadUsers, resetApiState, apiState, apiStateRef };
}
