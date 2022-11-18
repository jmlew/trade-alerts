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
  clearCurrentUser: () => void;
  loadUser: (userId: number) => void;
  resetApiState: () => void;
}

export function LoadUserViewModel(userFacade: UserFacade): LoadUserViewModelResult {
  const user: User | null = useObservable(userFacade.currentUser$);
  const apiState: ApiState | null = useObservable(userFacade.usersReadState$);
  const apiStateRef: ApiStateReference = useApiStateReference(apiState);

  function loadUser(userId: number) {
    userFacade.loadUser(userId);
  }

  function clearCurrentUser() {
    userFacade.clearCurrentUserId();
  }

  function resetApiState() {
    userFacade.resetReadState();
  }

  return { user, loadUser, clearCurrentUser, resetApiState, apiState, apiStateRef };
}
