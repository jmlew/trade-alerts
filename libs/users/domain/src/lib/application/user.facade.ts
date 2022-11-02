import { Observable } from 'rxjs';

import { ApiState } from '@trade-alerts/shared/data-access';

import { User, UserDetails } from '../entities/user.model';
import { userEffects } from '../state/user.effects';
import { userStore } from '../state/user.store';

/*
  Facade for the Users domain which acts as a single API through which other feature
  components can interact with this domain and its http services.

  Exposes a simplified API for state management through custom observabe stores.
*/

class UserFacade {
  /* State selectors. */
  usersReadState$: Observable<ApiState> = userStore.selectApiReadState();
  usersWriteState$: Observable<ApiState> = userStore.selectApiWriteState();
  allUsers$: Observable<User[]> = userStore.selectAllUsers();
  currentUser$: Observable<User | null> = userStore.selectCurrentUser();
  selectUser(id: number): Observable<User | null> {
    return userStore.selectUser(id);
  }

  /* State API action handlers. */
  loadUser(userId: number) {
    userEffects.loadUser(userId);
  }

  loadUsers() {
    userEffects.loadUsers();
  }

  createUser(values: UserDetails) {
    userEffects.createUser(values);
  }

  updateUser(userId: number, values: UserDetails, isOptimistic = false) {
    isOptimistic
      ? userEffects.updateUserOptimistic(userId, values)
      : userEffects.updateUser(userId, values);
  }

  deleteUser(userId: number, isOptimistic = false) {
    isOptimistic
      ? userEffects.deleteUserOptimistic(userId)
      : userEffects.deleteUser(userId);
  }

  clearCurrentUser() {
    userStore.onClearCurrentUser();
  }

  resetReadState() {
    userStore.onReadIdle();
  }

  resetWriteState() {
    userStore.onWriteIdle();
  }
}

export const userFacade: UserFacade = new UserFacade();
