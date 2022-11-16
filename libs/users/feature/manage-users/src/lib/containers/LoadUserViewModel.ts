import {
  ApiState,
  ApiStateReference,
  useApiStateReference,
} from '@trade-alerts/shared/data-access';
import { useObservable } from '@trade-alerts/shared/util-common';
import { User, UserFacade } from '@trade-alerts/users/domain';

export interface LoadUserViewModelResult {
  user: User | null;
  apiState: ApiState | null;
  apiStateRef: ApiStateReference;
  loadUser: (userId: number) => void;
  resetApiState: () => void;
}

export function LoadUserViewModel(
  userFacade: UserFacade,
  userId: number
): LoadUserViewModelResult {
  const user: User | null = useObservable(userFacade.selectUser(userId));
  const apiState: ApiState | null = useObservable(userFacade.usersReadState$);
  const apiStateRef: ApiStateReference = useApiStateReference(apiState);

  function loadUser(userId: number) {
    userFacade.loadUser(userId);
  }

  function resetApiState() {
    userFacade.resetReadState();
  }

  return { user, loadUser, resetApiState, apiState, apiStateRef };
}
