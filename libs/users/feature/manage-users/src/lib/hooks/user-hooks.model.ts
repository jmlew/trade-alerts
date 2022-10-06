import { ApiState, ApiStateReferenceManager } from '@trade-alerts/shared/data-access';
import { User } from '@trade-alerts/users/domain';

export interface ApiStateHook {
  apiState: ApiState;
  stateManager: ApiStateReferenceManager;
}

export interface UserDataHook extends ApiStateHook {
  user: User | undefined;
}

export interface UsersDataHook extends ApiStateHook {
  users: User[] | undefined;
}
