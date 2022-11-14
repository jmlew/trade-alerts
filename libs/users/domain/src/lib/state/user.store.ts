import { Observable, filter, map, switchMap, distinctUntilKeyChanged } from 'rxjs';

import {
  ApiState,
  ApiStateField,
  ApiStateManager,
  ObservableStore,
} from '@trade-alerts/shared/data-access';
import { EntitiesService, Entity, isNonNull } from '@trade-alerts/shared/util-common';

import { User, UserDetails } from '../entities/user.model';

interface UserState {
  users: Entity<User>;
  currentUserId: number | null;
  apiReadState: ApiState;
  apiWriteState: ApiState;
}

const initialState: UserState = {
  users: {},
  currentUserId: null,

  /* Read and write states are tracked separately for usecases which include both loading
  from and updating the store. */
  apiReadState: ApiStateManager.onIdle(),
  apiWriteState: ApiStateManager.onIdle(),
};

/**
 * User Observable Store implemented as a singleton to manage user state.
 */
export class UserStore extends ObservableStore<UserState> {
  private static instance: UserStore;
  private entitiesService: EntitiesService<User, number>;

  override enableLogging = true;
  override extraLoggingKeys: (keyof UserState)[] = ['apiReadState', 'apiWriteState'];

  private constructor() {
    super(initialState);
    this.entitiesService = new EntitiesService('id');
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserStore();
    }
    return this.instance;
  }

  onReadIdle() {
    const state: UserState = this.getState();
    this.update({ ...state, apiReadState: ApiStateManager.onIdle() });
  }

  onWriteIdle() {
    const state: UserState = this.getState();
    this.update({ ...state, apiWriteState: ApiStateManager.onIdle() });
  }

  onReadPending() {
    const state: UserState = this.getState();
    this.update({ ...state, apiReadState: ApiStateManager.onPending() });
  }

  onWritePending() {
    const state: UserState = this.getState();
    this.update({ ...state, apiWriteState: ApiStateManager.onPending() });
  }

  onReadFailed(error: string) {
    const state: UserState = this.getState();
    this.update({ ...state, apiReadState: ApiStateManager.onFailed(error) });
  }

  onWriteFailed(error: string) {
    const state: UserState = this.getState();
    this.update({ ...state, apiWriteState: ApiStateManager.onFailed(error) });
  }

  onLoadUsersCompleted(data: User[]) {
    const state: UserState = this.getState();
    this.update({
      ...state,
      users: this.entitiesService.setAll(data),
      apiReadState: ApiStateManager.onCompleted(),
    });
  }

  onLoadUserCompleted(data: User) {
    const state: UserState = this.getState();
    this.update({
      ...state,
      users: this.entitiesService.setOne(data, state.users),
      apiReadState: ApiStateManager.onCompleted(),
    });
  }

  onUpdateUserCompleted(id: number, changes: UserDetails) {
    const state: UserState = this.getState();
    this.update({
      ...state,
      users: this.entitiesService.updateOne({ id, changes }, state.users),
      apiWriteState: ApiStateManager.onCompleted(),
    });
  }

  onCreateUserCompleted(data: User) {
    const state: UserState = this.getState();
    this.update({
      ...state,
      users: this.entitiesService.setOne(data, state.users),
      currentUserId: data.id,
      apiWriteState: ApiStateManager.onCompleted(),
    });
  }

  onDeleteUserCompleted(id: number) {
    const state: UserState = this.getState();
    this.update({
      ...state,
      users: this.entitiesService.removeOne(id, state.users),
      apiWriteState: ApiStateManager.onCompleted(),
    });
  }

  onClearCurrentUser() {
    const state: UserState = this.getState();
    this.update({ ...state, currentUserId: null });
  }

  selectUserEntities(): Observable<Entity<User>> {
    return this.selectState().pipe(map((state: UserState) => state.users));
  }

  selectUserEntitiesValue(): Entity<User> {
    return this.getState().users;
  }

  selectAllUsers(): Observable<User[]> {
    return this.selectUserEntities().pipe(
      map((users: Entity<User>) => this.entitiesService.selectAll(users))
    );
  }

  selectIds(): Observable<number[]> {
    return this.selectUserEntities().pipe(
      map((users: Entity<User>) => this.entitiesService.selectIds(users))
    );
  }

  selectUser(id: number): Observable<User | null> {
    return this.selectUserEntities().pipe(
      map((users: Entity<User>) => this.entitiesService.selectOne(id, users))
    );
  }

  selectUserValue(id: number): User | null {
    return this.entitiesService.selectOne(id, this.selectUserEntitiesValue());
  }

  selectCurrentUserId(): Observable<number | null> {
    return this.selectState().pipe(map((state: UserState) => state.currentUserId));
  }

  selectCurrentUser(): Observable<User | null> {
    return this.selectCurrentUserId().pipe(
      switchMap((id: number) => this.selectUser(id))
    );
  }

  selectApiReadState(): Observable<ApiState> {
    return this.selectState().pipe(
      map((state: UserState) => state.apiReadState),
      distinctUntilKeyChanged(ApiStateField.Status),
      filter(isNonNull)
    );
  }

  selectApiWriteState(): Observable<ApiState> {
    return this.selectState().pipe(
      map((state: UserState) => state.apiWriteState),
      distinctUntilKeyChanged(ApiStateField.Status),
      filter(isNonNull)
    );
  }
}

export const userStore: UserStore = UserStore.getInstance();
