import { Observable, filter, map, switchMap, distinctUntilKeyChanged } from 'rxjs';

import {
  ApiState,
  ApiStateField,
  ApiStateManager,
  ObservableStore,
} from '@trade-alerts/shared/data-access';
import { EntitiesService, Entity, isNonNull } from '@trade-alerts/shared/util-common';

import { User, UserDetails } from '../entities/user.model';

interface State {
  users: Entity<User>;
  currentUserId: number | null;
  apiReadState: ApiState;
  apiWriteState: ApiState;
}

const initialState: State = {
  users: {},
  currentUserId: null,

  /* Read and write states are tracked separately for usecases which include both loading
  from and updating the store. */
  apiReadState: ApiStateManager.onInit(),
  apiWriteState: ApiStateManager.onInit(),
};

class UserStore extends ObservableStore<State> {
  override enableLogging = true;

  constructor(
    initialState: State,
    private entitiesService: EntitiesService<User, number>
  ) {
    super(initialState);
  }

  onReadPending() {
    this.state = {
      ...this.state,
      apiReadState: ApiStateManager.onPending(),
    };
    this.applyState();
  }

  onWritePending() {
    this.state = {
      ...this.state,
      apiWriteState: ApiStateManager.onPending(),
    };
    this.applyState();
  }

  onReadFailed(error: string) {
    this.state = {
      ...this.state,
      apiReadState: ApiStateManager.onFailed(error),
    };
    this.applyState();
  }

  onWriteFailed(error: string) {
    this.state = {
      ...this.state,
      apiWriteState: ApiStateManager.onFailed(error),
    };
    this.applyState();
  }

  onLoadUsersCompleted(data: User[]) {
    this.state = {
      ...this.state,
      users: this.entitiesService.createEntities(data),
      apiReadState: ApiStateManager.onCompleted(),
    };
    this.applyState();
  }

  onLoadUserCompleted(data: User) {
    this.state = {
      ...this.state,
      users: this.entitiesService.upsertOne(data, this.state.users),
      apiReadState: ApiStateManager.onCompleted(),
    };
    this.applyState();
  }

  onUpdateUserCompleted(id: number, changes: UserDetails) {
    this.state = {
      ...this.state,
      users: this.entitiesService.updateOne({ id, changes }, this.state.users),
      apiWriteState: ApiStateManager.onCompleted(),
    };
    this.applyState();
  }

  onCreateUserCompleted(data: User) {
    this.state = {
      ...this.state,
      users: this.entitiesService.addOne(data, this.state.users),
      currentUserId: data.id,
      apiWriteState: ApiStateManager.onCompleted(),
    };
    this.applyState();
  }

  onDeleteUserCompleted(id: number) {
    this.state = {
      ...this.state,
      users: this.entitiesService.removeOne(id, this.state.users),
      apiWriteState: ApiStateManager.onCompleted(),
    };
    this.applyState();
  }

  onClearCurrentUser() {
    this.state = {
      ...this.state,
      currentUserId: null,
    };
    this.applyState();
  }

  selectUserEntities(): Observable<Entity<User>> {
    return this.selectState().pipe(map((state: State) => state.users));
  }

  selectUserEntitiesValue(): Entity<User> {
    return this.selectStateValue().users;
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
    return this.selectState().pipe(map((state: State) => state.currentUserId));
  }

  selectCurrentUser(): Observable<User | null> {
    return this.selectCurrentUserId().pipe(
      switchMap((id: number) => this.selectUser(id))
    );
  }

  selectApiReadState(): Observable<ApiState> {
    return this.selectState().pipe(
      map((state: State) => state.apiReadState),
      distinctUntilKeyChanged(ApiStateField.Status),
      filter(isNonNull)
    );
  }

  selectApiWriteState(): Observable<ApiState> {
    return this.selectState().pipe(
      map((state: State) => state.apiWriteState),
      distinctUntilKeyChanged(ApiStateField.Status),
      filter(isNonNull)
    );
  }
}

const entitiesService: EntitiesService<User, number> = new EntitiesService('id');
export const userStore: UserStore = new UserStore(initialState, entitiesService);
