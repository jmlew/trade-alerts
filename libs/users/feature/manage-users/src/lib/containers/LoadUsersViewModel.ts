import {
  ApiState,
  ApiStateReference,
  useApiStateReference,
} from '@trade-alerts/shared/data-access';
import { useObservable } from '@trade-alerts/shared/util-common';
import { User, UserFacade } from '@trade-alerts/users/domain';

interface ViewModel {
  users: User[] | null;
  loadState: ApiState | null;
  loadStateRef: ApiStateReference;
  loadUsers: () => void;
  resetLoad: () => void;
}

export function LoadUsersViewModel(userFacade: UserFacade): ViewModel {
  const users: User[] | null = useObservable<User[]>(userFacade.allUsers$);
  const loadState: ApiState | null = useObservable<ApiState>(userFacade.usersReadState$);
  const loadStateRef: ApiStateReference = useApiStateReference(loadState);

  function loadUsers() {
    userFacade.loadUsers();
  }

  function resetLoad() {
    userFacade.resetReadState();
  }

  return { users, loadUsers, resetLoad, loadState, loadStateRef };
}
