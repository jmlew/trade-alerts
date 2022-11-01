import {
  ApiState,
  ApiStateReference,
  useApiStateReference,
} from '@trade-alerts/shared/data-access';
import { useObservable } from '@trade-alerts/shared/util-common';
import { User, userFacade } from '@trade-alerts/users/domain';

interface Props {
  user: User | null;
  loadState: ApiState | null;
  loadStateRef: ApiStateReference;
  loadUser: (userId: number) => void;
  resetLoad: () => void;
}

export function LoadUserViewModel(userId: number): Props {
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
