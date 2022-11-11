import { firstValueFrom, of } from 'rxjs';

import { ApiStatus } from '@trade-alerts/shared/data-access';
import { EntitiesService, Entity } from '@trade-alerts/shared/util-common';

import { User, UserDetails } from '../entities/user.model';
import { UserEffects } from '../state/user.effects';
import { UserStore, initialUserState } from '../state/user.store';
import { UserFacade } from './user.facade';

/**
 * Istantiates all dependancies for mocking the facade. To be called after spies and mocks
 * have been applied to the relevant methods on the class prototypes for each test.
 */
function instantiateMocks() {
  userStore = new UserStore(initialUserState, new EntitiesService('id'));
  userEffects = new UserEffects(userStore);
  userFacade = new UserFacade(userStore, userEffects);
}
let userStore: UserStore;
let userEffects: UserEffects;
let userFacade: UserFacade;

describe('UserFacade', () => {
  describe('Selectors', () => {
    const allUsers: User[] = [
      { id: 1, firstName: 'John', lastName: 'Smith', email: 'john@sample.com' },
      { id: 2, firstName: 'Fred', lastName: 'Jackson', email: 'fred@sample.com' },
    ];
    const users: Entity<User> = { 1: allUsers[0], 2: allUsers[1] };

    it('should select usersReadState from user store', async () => {
      const value = { status: ApiStatus.Cancelled, error: null };
      jest
        .spyOn(UserStore.prototype, 'selectApiReadState')
        .mockImplementation(() => of(value));

      instantiateMocks();
      await expect(firstValueFrom(userFacade.usersReadState$)).resolves.toEqual(value);
    });

    it('should select usersWriteState from user store', async () => {
      const value = { status: ApiStatus.Cancelled, error: null };
      jest
        .spyOn(UserStore.prototype, 'selectApiWriteState')
        .mockImplementation(() => of(value));

      instantiateMocks();
      await expect(firstValueFrom(userFacade.usersWriteState$)).resolves.toEqual(value);
    });
    it('should select allUsers from user store', () => {
      const value = allUsers;
      jest
        .spyOn(UserStore.prototype, 'selectAllUsers')
        .mockImplementation(() => of(value));

      instantiateMocks();
      return expect(firstValueFrom(userFacade.allUsers$)).resolves.toEqual(value);
    });
    it('should select currentUser from user store', async () => {
      const value = users[1] as User;
      jest
        .spyOn(UserStore.prototype, 'selectCurrentUser')
        .mockImplementation(() => of(value));

      instantiateMocks();
      await expect(firstValueFrom(userFacade.currentUser$)).resolves.toEqual(value);
    });
    it('should select a user based on a given id from user store', async () => {
      const id = 1;
      jest
        .spyOn(UserStore.prototype, 'selectUser')
        .mockImplementation((id: number) => of(users[id] as User));

      instantiateMocks();
      await expect(firstValueFrom(userFacade.selectUser(id))).resolves.toEqual(users[id]);
    });
  });

  describe('Actions', () => {
    const sampleUserParams: UserDetails = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@sampleuser.com',
    };
    afterAll(() => {
      jest.resetAllMocks();
    });
    it('should clearCurrentUser using user store', () => {
      jest.spyOn(UserStore.prototype, 'onClearCurrentUser');
      instantiateMocks();

      userFacade.clearCurrentUser();
      expect(userStore.onClearCurrentUser).toHaveBeenCalled();
    });
    it('should resetReadState using user store', () => {
      jest.spyOn(UserStore.prototype, 'onReadIdle');
      // jest.spyOn(UserFacade.prototype, 'resetReadState');
      instantiateMocks();

      userFacade.resetReadState();
      expect(userStore.onReadIdle).toHaveBeenCalled();
    });
    it('should resetWriteState using user store', () => {
      jest.spyOn(UserStore.prototype, 'onWriteIdle');
      instantiateMocks();

      userFacade.resetWriteState();
      expect(userStore.onWriteIdle).toHaveBeenCalled();
    });
    it('should loadUser using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'loadUser');
      instantiateMocks();

      const id = 1;
      userFacade.loadUser(id);
      expect(userEffects.loadUser).toHaveBeenCalledWith(id);
    });
    it('should loadUsers using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'loadUsers');
      instantiateMocks();

      userFacade.loadUsers();
      expect(userEffects.loadUsers).toHaveBeenCalled();
    });
    it('should createUser using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'createUser');
      instantiateMocks();

      userFacade.createUser(sampleUserParams);
      expect(userEffects.createUser).toHaveBeenCalledWith(sampleUserParams);
    });
    it('should updateUser using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'updateUser');
      instantiateMocks();

      const id = 1;
      userFacade.updateUser(id, sampleUserParams, false);
      expect(userEffects.updateUser).toHaveBeenCalledWith(id, sampleUserParams);
    });
    it('should updateUser optimistically using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'updateUserOptimistic');
      instantiateMocks();

      const id = 1;
      userFacade.updateUser(id, sampleUserParams, true);
      expect(userEffects.updateUserOptimistic).toHaveBeenCalledWith(id, sampleUserParams);
    });
    it('should deleteUser using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'deleteUser');
      instantiateMocks();

      const id = 1;
      userFacade.deleteUser(id, false);
      expect(userEffects.deleteUser).toHaveBeenCalledWith(id);
    });
    it('should deleteUser optimistically using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'deleteUserOptimistic');
      instantiateMocks();

      const id = 1;
      userFacade.deleteUser(id, true);
      expect(userEffects.deleteUserOptimistic).toHaveBeenCalledWith(id);
    });
  });
});
