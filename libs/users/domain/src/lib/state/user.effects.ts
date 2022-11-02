import { map, take } from 'rxjs';

import { objectsSortOnKey } from '@trade-alerts/shared/util-common';

import { User, UserDetails } from '../entities/user.model';
import { userApiRxjsAjaxService } from '../infrastructure/rxjs-ajax/user-api-rxjs-ajax.service';
import { userStore } from './user.store';

class UserEffects {
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

  updateUser(userId: number, values: UserDetails) {
    userStore.onWritePending();
    userApiRxjsAjaxService
      .updateUser(userId, values)
      .pipe(take(1))
      .subscribe({
        next: (data: User) => {
          userStore.onUpdateUserCompleted(userId, values);
        },
        error: (error: string) => {
          userStore.onWriteFailed(error);
        },
      });
  }

  /**
   * Optimistically updates the store while awaiting for the server response. Successful
   * responses are ignored and failed response revert state by reloading all users.
   */
  updateUserOptimistic(userId: number, values: UserDetails) {
    userStore.onUpdateUserCompleted(userId, values);
    userApiRxjsAjaxService
      .updateUser(userId, values)
      .pipe(take(1))
      .subscribe({
        error: (error: string) => {
          userStore.onWriteFailed(error);
          this.loadUsers();
        },
      });
  }

  deleteUser(userId: number) {
    userStore.onWritePending();
    userApiRxjsAjaxService
      .deleteUser(userId)
      .pipe(take(1))
      .subscribe({
        next: (userId: number) => {
          userStore.onDeleteUserCompleted(userId);
        },
        error: (error: string) => {
          userStore.onWriteFailed(error);
        },
      });
  }

  /**
   * Optimistically updates the store while awaiting for the server response. Successful
   * responses are ignored and failed response revert state by reloading all users.
   */
  deleteUserOptimistic(userId: number) {
    userStore.onDeleteUserCompleted(userId);
    userApiRxjsAjaxService
      .deleteUser(userId)
      .pipe(take(1))
      .subscribe({
        error: (error: string) => {
          userStore.onWriteFailed(error);
          this.loadUsers();
        },
      });
  }
}

export const userEffects: UserEffects = new UserEffects();
