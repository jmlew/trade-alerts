import { Observable, map, take } from 'rxjs';

import { ApiState } from '@trade-alerts/shared/data-access';
import { objectsSortOnKey } from '@trade-alerts/shared/util-common';

import { User, UserDetails } from '../entities/user.model';
import { userApiRxjsAjaxService } from '../infrastructure/rxjs-ajax/user-api-rxjs-ajax.service';
import { userStore } from '../state/user-data.store';

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
    // Load the current user value from the store if it exists.
    const userValue: User | null = userStore.selectUserValue(userId);
    if (userValue) {
      userStore.onLoadUserCompleted(userValue);
      return;
    }
    userStore.onReadPending();
    userApiRxjsAjaxService
      .getUser(userId)
      .pipe(take(1))
      .subscribe({
        next: (data: User) => userStore.onLoadUserCompleted(data),
        error: (error: string) => userStore.onReadFailed(error),
      });
  }

  loadUsers() {
    userStore.onReadPending();
    userApiRxjsAjaxService
      .getUsers()
      .pipe(
        map((items: User[]) => objectsSortOnKey<User>(items, 'firstName')),
        take(1)
      )
      .subscribe({
        next: (data: User[]) => userStore.onLoadUsersCompleted(data),
        error: (error: string) => userStore.onReadFailed(error),
      });
  }

  createUser(values: UserDetails) {
    userStore.onWritePending();
    userApiRxjsAjaxService
      .createUser(values)
      .pipe(take(1))
      .subscribe({
        next: (data: User) => userStore.onCreateUserCompleted(data),
        error: (error: string) => userStore.onWriteFailed(error),
      });
  }

  updateUser(userId: number, values: UserDetails, isOptimistic = false) {
    // Optimistically update the store while awaiting for the server response.
    isOptimistic
      ? userStore.onUpdateUserCompleted(userId, values)
      : userStore.onWritePending();
    userApiRxjsAjaxService
      .updateUser(userId, values)
      .pipe(take(1))
      .subscribe({
        next: (data: User) => {
          // Successful response is ignored if update is handled optimistically.
          !isOptimistic && userStore.onUpdateUserCompleted(userId, values);
        },
        error: (error: string) => {
          userStore.onWriteFailed(error);
          // Revert optimistic update on failed response by reloading all users.
          isOptimistic && this.loadUsers();
        },
      });
  }

  deleteUser(userId: number, isOptimistic = false) {
    // Optimistically update the store while awaiting for the server response.
    isOptimistic ? userStore.onDeleteUserCompleted(userId) : userStore.onWritePending();
    userApiRxjsAjaxService
      .deleteUser(userId)
      .pipe(take(1))
      .subscribe({
        next: (userId: number) => {
          // Successful response is ignored since update is handled optimistically.
          !isOptimistic && userStore.onDeleteUserCompleted(userId);
        },
        error: (error: string) => {
          userStore.onWriteFailed(error);
          // Revert optimistic update on failed response by reloading all users.
          isOptimistic && this.loadUsers();
        },
      });
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
