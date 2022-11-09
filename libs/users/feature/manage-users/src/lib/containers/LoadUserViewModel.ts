import {
  ApiState,
  ApiStateReference,
  useApiStateReference,
} from '@trade-alerts/shared/data-access';
import { useObservable } from '@trade-alerts/shared/util-common';
import { User, UserFacade } from '@trade-alerts/users/domain';

interface ViewModel {
  user: User | null;
  loadState: ApiState | null;
  loadStateRef: ApiStateReference;
  loadUser: (userId: number) => void;
  resetLoad: () => void;
}

export function LoadUserViewModel(userFacade: UserFacade, userId: number): ViewModel {
  const user: User | null = useObservable<User | null>(userFacade.selectUser(userId));
  const loadState: ApiState | null = useObservable<ApiState>(userFacade.usersReadState$);
  const loadStateRef: ApiStateReference = useApiStateReference(loadState);

  function loadUser(userId: number) {
    userFacade.loadUser(userId);
  }

  function resetLoad() {
    userFacade.resetReadState();
  }

  return { user, loadUser, resetLoad, loadState, loadStateRef };
}
