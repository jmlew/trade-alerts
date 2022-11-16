import { firstValueFrom } from 'rxjs';

import { ApiStatus } from '@trade-alerts/shared/data-access';

import { User, UserDetails } from '../entities/user.model';
import { UserStore, initialState } from '../state/user.store';
import { mockUserEntities, mockUsers } from './mock-data';

describe(UserStore, () => {
  const store: UserStore = UserStore.getInstance();
  describe('Actions', () => {
    afterEach(() => {
      store && store.onClear();
      jest.restoreAllMocks();
    });
    it('should store read idle state and retrieve updated values', () => {
      expect(store.getState().apiReadState).toEqual(initialState.apiReadState);
      store.onReadIdle();
      const status = ApiStatus.Idle;
      expect(store.getState().apiReadState).toEqual({ status, error: null });
    });
    it('should store write idle state and retrieve updated values', () => {
      expect(store.getState().apiWriteState).toEqual(initialState.apiWriteState);
      store.onWriteIdle();
      const status = ApiStatus.Idle;
      expect(store.getState().apiWriteState).toEqual({ status, error: null });
    });
    it('should store read pending state and retrieve updated values', () => {
      expect(store.getState().apiReadState).toEqual(initialState.apiReadState);
      store.onReadPending();
      const status = ApiStatus.Pending;
      expect(store.getState().apiReadState).toEqual({ status, error: null });
    });
    it('should store write pending state and retrieve updated values', () => {
      expect(store.getState().apiWriteState).toEqual(initialState.apiWriteState);
      store.onWritePending();
      const status = ApiStatus.Pending;
      expect(store.getState().apiWriteState).toEqual({ status, error: null });
    });
    it('should store read failed state and retrieve updated values', () => {
      expect(store.getState().apiReadState).toEqual(initialState.apiReadState);
      const status = ApiStatus.Failed;
      const error = 'read failed error';
      store.onReadFailed(error);
      expect(store.getState().apiReadState).toEqual({ status, error });
    });
    it('should store write failed state and retrieve updated values', () => {
      expect(store.getState().apiWriteState).toEqual(initialState.apiWriteState);
      const status = ApiStatus.Failed;
      const error = 'write failed error';
      store.onWriteFailed(error);
      expect(store.getState().apiWriteState).toEqual({ status, error });
    });
    it('should store load users completed state and retrieve updated values', () => {
      expect(store.getState().apiReadState).toEqual(initialState.apiReadState);
      const status = ApiStatus.Completed;
      store.onLoadUsersCompleted(mockUsers);
      expect(store.getState().apiReadState).toEqual({ status, error: null });
      expect(store.getState().users).toEqual(mockUserEntities);
    });
    it('should store load user completed state and retrieve updated values', () => {
      expect(store.getState().users).toEqual(initialState.users);
      const status = ApiStatus.Completed;
      const userA = mockUsers[0];
      const userEntityA = { [userA.id]: userA };
      store.onLoadUserCompleted(userA);
      expect(store.getState().apiReadState).toEqual({ status, error: null });
      expect(store.getState().users).toEqual(userEntityA);
      expect(store.getState().currentUserId).toEqual(userA.id);
      const userB = mockUsers[1];
      const userEntityB = { [userB.id]: userB };
      store.onLoadUserCompleted(userB);
      expect(store.getState().users).toEqual({ ...userEntityA, ...userEntityB });
      expect(store.getState().currentUserId).toEqual(userB.id);
      const updatedUserA = { ...userA, firstName: 'updated first name' };
      const updatedUserEntityA = { [userA.id]: updatedUserA };
      store.onLoadUserCompleted(updatedUserA);
      expect(store.getState().users).toEqual({
        ...userEntityA,
        ...userEntityB,
        ...updatedUserEntityA,
      });
      expect(store.getState().currentUserId).toEqual(updatedUserA.id);
    });
    it('should store update user completed state and retrieve updated values', () => {
      expect(store.getState().users).toEqual(initialState.users);
      store.onLoadUsersCompleted(mockUsers);
      expect(store.getState().users).toEqual(mockUserEntities);
      const user = mockUsers[0];
      const id: number = user.id;
      const changes: UserDetails = {
        email: 'updated email',
        firstName: 'updated first name',
        lastName: 'updated last name',
      };
      store.onUpdateUserCompleted(id, changes);
      const updatedUsers = { ...mockUserEntities, [id]: { ...user, ...changes } };
      expect(store.getState().users).toEqual(updatedUsers);
      expect(store.getState().currentUserId).toEqual(id);
    });
    it('should store create user completed state and retrieve updated values', () => {
      expect(store.getState().users).toEqual(initialState.users);
      store.onLoadUsersCompleted(mockUsers);
      expect(store.getState().users).toEqual(mockUserEntities);
      const id = 66;
      const user: User = {
        id,
        email: 'new email',
        firstName: 'new first name',
        lastName: 'new last name',
      };
      store.onCreateUserCompleted(user);
      const updatedUsers = { ...mockUserEntities, [id]: user };
      expect(store.getState().users).toEqual(updatedUsers);
      expect(store.getState().currentUserId).toEqual(id);
      expect(store.selectUserValue(id)).toEqual(user);
    });
    it('should store delete user completed state and retrieve updated values', () => {
      expect(store.getState().users).toEqual(initialState.users);
      store.onLoadUsersCompleted(mockUsers);
      expect(store.getState().users).toEqual(mockUserEntities);
      const user = mockUsers[0];
      const id: number = user.id;
      store.onDeleteUserCompleted(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: removed, ...updatedUserEntities } = mockUserEntities;
      expect(store.getState().users).toEqual(updatedUserEntities);
      expect(store.selectUserValue(id)).toEqual(null);
    });

    it('should store clear current user state and retrieve updated values', () => {
      const user = mockUsers[0];
      store.onLoadUserCompleted(user);
      expect(store.getState().currentUserId).toEqual(user.id);
      store.onClearCurrentUser();
      expect(store.getState().currentUserId).toEqual(null);
    });
    it('should store clear all state and retrieve updated values', () => {
      store.onLoadUsersCompleted(mockUsers);
      store.onWritePending();
      expect(store.getState().apiReadState).toEqual({
        status: ApiStatus.Completed,
        error: null,
      });
      expect(store.getState().apiWriteState).toEqual({
        status: ApiStatus.Pending,
        error: null,
      });
      expect(store.getState().users).toEqual(mockUserEntities);
      store.onClear();
      expect(store.getState().users).toEqual(initialState.users);
      expect(store.getState().apiReadState).toEqual(initialState.apiReadState);
      expect(store.getState().apiWriteState).toEqual(initialState.apiWriteState);
    });
  });
  describe('Selectors', () => {
    afterEach(() => {
      store && store.onClear();
      jest.restoreAllMocks();
    });

    it('should select user entities', async () => {
      store.onLoadUsersCompleted(mockUsers);
      expect(store.selectUserEntitiesValue()).toEqual(mockUserEntities);
      await expect(firstValueFrom(store.selectUserEntities())).resolves.toEqual(
        mockUserEntities
      );
    });
    it('should select all users and their ids', async () => {
      store.onLoadUsersCompleted(mockUsers);
      const ids: string[] = mockUsers.map((user: User) => user.id.toString());
      await expect(firstValueFrom(store.selectAllUsers())).resolves.toEqual(mockUsers);
      await expect(firstValueFrom(store.selectIds())).resolves.toEqual(ids);
    });
    it('should select user', async () => {
      const user = mockUsers[0];
      store.onLoadUserCompleted(user);
      expect(store.selectUserValue(user.id)).toEqual(user);
      await expect(firstValueFrom(store.selectUser(user.id))).resolves.toEqual(user);
    });
    it('should select current user', async () => {
      const user = mockUsers[0];
      store.onLoadUserCompleted(user);
      await expect(firstValueFrom(store.selectCurrentUser())).resolves.toEqual(user);
      await expect(firstValueFrom(store.selectCurrentUserId())).resolves.toEqual(user.id);
    });
    it('should select api read and write states', async () => {
      store.onReadPending();
      await expect(firstValueFrom(store.selectApiReadState())).resolves.toEqual({
        status: ApiStatus.Pending,
        error: null,
      });
      const error = 'error';
      store.onWriteFailed(error);
      await expect(firstValueFrom(store.selectApiWriteState())).resolves.toEqual({
        status: ApiStatus.Failed,
        error,
      });
    });
  });
});
