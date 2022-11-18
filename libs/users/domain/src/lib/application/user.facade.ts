import { Observable } from 'rxjs';

import { ApiState } from '@trade-alerts/shared/data-access';

import { User, UserDetails } from '../entities/user.model';
import { UserEffects, userEffects } from '../state/user.effects';
import { UserStore, userStore } from '../state/user.store';

/*
  Facade for the Users domain which acts as a single API through which other feature
  components can interact with this domain and its http services.

  Exposes a simplified API for state management through custom observabe stores.
*/

export class UserFacade {
  /* State selectors. */
  usersReadState$: Observable<ApiState> = this.userStore.selectApiReadState();
  usersWriteState$: Observable<ApiState> = this.userStore.selectApiWriteState();
  allUsers$: Observable<User[]> = this.userStore.selectAllUsers();
  currentUser$: Observable<User | null> = this.userStore.selectCurrentUser();
  currentUserId$: Observable<number | null> = this.userStore.selectCurrentUserId();

  constructor(private userStore: UserStore, private userEffects: UserEffects) {}

  /* State API action handlers. */
  loadUser(userId: number) {
    this.userEffects.loadUser(userId);
  }

  loadUsers() {
    this.userEffects.loadUsers();
  }

  createUser(values: UserDetails) {
    this.userEffects.createUser(values);
  }

  updateUser(userId: number, values: UserDetails, isOptimistic = false) {
    isOptimistic
      ? this.userEffects.updateUserOptimistic(userId, values)
      : this.userEffects.updateUser(userId, values);
  }

  deleteUser(userId: number, isOptimistic = false) {
    isOptimistic
      ? this.userEffects.deleteUserOptimistic(userId)
      : this.userEffects.deleteUser(userId);
  }

  clearCurrentUserId() {
    this.userStore.onClearCurrentUserId();
  }

  resetReadState() {
    this.userStore.onReadIdle();
  }

  resetWriteState() {
    this.userStore.onWriteIdle();
  }
}

export const userFacade: UserFacade = new UserFacade(userStore, userEffects);
