import { map, take } from 'rxjs';

import { RepositoryObservable } from '@trade-alerts/shared/data-access';
import { objectsSortOnKey } from '@trade-alerts/shared/util-common';

import { User, UserDetails } from '../entities/user.model';
import { userApiRxjsAjaxService } from '../infrastructure/rxjs-ajax/user-api-rxjs-ajax.service';
import { UserStore, userStore } from './user.store';

export class UserEffects {
  constructor(
    private userStore: UserStore,
    private dataService: RepositoryObservable<User, number>
  ) {}

  loadUser(userId: number) {
    // Load the current user value from the store if it exists.
    const userValue: User | null = this.userStore.selectUserValue(userId);
    if (userValue) {
      this.userStore.onLoadUserCompleted(userValue);
      return;
    }
    this.userStore.onReadPending();
    this.dataService
      .read(userId)
      .pipe(take(1))
      .subscribe({
        next: (data: User) => this.userStore.onLoadUserCompleted(data),
        error: (error: string) => this.userStore.onReadFailed(error),
      });
  }

  loadUsers() {
    this.userStore.onReadPending();
    this.dataService
      .readAll()
      .pipe(
        map((items: User[]) => objectsSortOnKey<User>(items, 'firstName')),
        take(1)
      )
      .subscribe({
        next: (data: User[]) => this.userStore.onLoadUsersCompleted(data),
        error: (error: string) => this.userStore.onReadFailed(error),
      });
  }

  createUser(values: UserDetails) {
    this.userStore.onWritePending();
    this.dataService
      .create(values)
      .pipe(take(1))
      .subscribe({
        next: (data: User) => this.userStore.onCreateUserCompleted(data),
        error: (error: string) => this.userStore.onWriteFailed(error),
      });
  }

  updateUser(userId: number, values: UserDetails) {
    this.userStore.onWritePending();
    this.dataService
      .update(userId, values)
      .pipe(take(1))
      .subscribe({
        next: (data: User) => {
          this.userStore.onUpdateUserCompleted(userId, values);
        },
        error: (error: string) => {
          this.userStore.onWriteFailed(error);
        },
      });
  }

  /**
   * Optimistically updates the store while awaiting for the server response. Successful
   * responses are ignored and failed response revert state by reloading all users.
   */
  updateUserOptimistic(userId: number, values: UserDetails) {
    this.userStore.onUpdateUserCompleted(userId, values);
    this.dataService
      .update(userId, values)
      .pipe(take(1))
      .subscribe({
        error: (error: string) => {
          this.userStore.onWriteFailed(error);
          this.loadUsers();
        },
      });
  }

  deleteUser(userId: number) {
    this.userStore.onWritePending();
    this.dataService
      .delete(userId)
      .pipe(take(1))
      .subscribe({
        next: (userId: number) => {
          this.userStore.onDeleteUserCompleted(userId);
        },
        error: (error: string) => {
          this.userStore.onWriteFailed(error);
        },
      });
  }

  /**
   * Optimistically updates the store while awaiting for the server response. Successful
   * responses are ignored and failed response revert state by reloading all users.
   */
  deleteUserOptimistic(userId: number) {
    this.userStore.onDeleteUserCompleted(userId);
    this.dataService
      .delete(userId)
      .pipe(take(1))
      .subscribe({
        error: (error: string) => {
          this.userStore.onWriteFailed(error);
          this.loadUsers();
        },
      });
  }
}

export const userEffects: UserEffects = new UserEffects(
  userStore,
  userApiRxjsAjaxService
);
