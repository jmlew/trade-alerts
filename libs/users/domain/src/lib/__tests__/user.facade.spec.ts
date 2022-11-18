import { firstValueFrom, of } from 'rxjs';

import { ApiStatus } from '@trade-alerts/shared/data-access';

import { UserFacade } from '../application/user.facade';
import { User, UserDetails } from '../entities/user.model';
import { UserApiRxjsAjaxService } from '../infrastructure/rxjs-ajax/user-api-rxjs-ajax.service';
import { UserApiMapper } from '../infrastructure/user-api.mapper';
import { UserEffects } from '../state/user.effects';
import { UserStore } from '../state/user.store';
import { mockUserEntities, mockUsers } from './mock-data';

let store: UserStore;
let effects: UserEffects;
let facade: UserFacade;
let dataService: UserApiRxjsAjaxService;

/**
 * Instantiates all dependancies for mocking the tests. To be called after spies and
 * mocks have been applied to the relevant methods on the class prototypes for each test.
 */
function createInstances() {
  store && store.onClear(); // Clear previous store state on current instance.
  store = UserStore.getInstance();
  dataService = new UserApiRxjsAjaxService(new UserApiMapper());
  effects = new UserEffects(store, dataService);
  facade = new UserFacade(store, effects);
}

describe(UserFacade, () => {
  describe('Selectors', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('should select users read state from user store', async () => {
      const value = { status: ApiStatus.Cancelled, error: null };
      jest
        .spyOn(UserStore.prototype, 'selectApiReadState')
        .mockImplementation(() => of(value));

      createInstances();
      await expect(firstValueFrom(facade.usersReadState$)).resolves.toEqual(value);
    });

    it('should select users write state from user store', async () => {
      const value = { status: ApiStatus.Cancelled, error: null };
      jest
        .spyOn(UserStore.prototype, 'selectApiWriteState')
        .mockImplementation(() => of(value));

      createInstances();
      await expect(firstValueFrom(facade.usersWriteState$)).resolves.toEqual(value);
    });
    it('should select all users from user store', async () => {
      const value = mockUsers;
      jest
        .spyOn(UserStore.prototype, 'selectAllUsers')
        .mockImplementation(() => of(value));

      createInstances();
      await expect(firstValueFrom(facade.allUsers$)).resolves.toEqual(value);
    });
    it('should select current user ID from user store', async () => {
      const value = 66;
      jest
        .spyOn(UserStore.prototype, 'selectCurrentUserId')
        .mockImplementation(() => of(value));

      createInstances();
      await expect(firstValueFrom(facade.currentUserId$)).resolves.toEqual(value);
    });
    it('should select current user from user store', async () => {
      const value = mockUserEntities[1] as User;
      jest
        .spyOn(UserStore.prototype, 'selectCurrentUser')
        .mockImplementation(() => of(value));

      createInstances();
      await expect(firstValueFrom(facade.currentUser$)).resolves.toEqual(value);
    });
  });

  describe('Actions', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
    const sampleUserParams: UserDetails = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@sampleuser.com',
    };
    it('should clear current user using user store', () => {
      jest.spyOn(UserStore.prototype, 'onClearCurrentUserId');

      createInstances();
      facade.clearCurrentUserId();
      expect(store.onClearCurrentUserId).toHaveBeenCalled();
    });
    it('should reset read state using user store', () => {
      jest.spyOn(UserStore.prototype, 'onReadIdle');

      createInstances();
      facade.resetReadState();
      expect(store.onReadIdle).toHaveBeenCalled();
    });
    it('should reset write state using user store', () => {
      jest.spyOn(UserStore.prototype, 'onWriteIdle');

      createInstances();
      facade.resetWriteState();
      expect(store.onWriteIdle).toHaveBeenCalled();
    });
    it('should load user using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'loadUser');

      createInstances();
      const id = 1;
      facade.loadUser(id);
      expect(effects.loadUser).toHaveBeenCalledWith(id);
    });
    it('should load users using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'loadUsers');

      createInstances();
      facade.loadUsers();
      expect(effects.loadUsers).toHaveBeenCalled();
    });
    it('should create user using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'createUser');

      createInstances();
      facade.createUser(sampleUserParams);
      expect(effects.createUser).toHaveBeenCalledWith(sampleUserParams);
    });
    it('should update user using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'updateUser');

      createInstances();
      const id = 1;
      facade.updateUser(id, sampleUserParams, false);
      expect(effects.updateUser).toHaveBeenCalledWith(id, sampleUserParams);
    });
    it('should update user optimistically using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'updateUserOptimistic');

      createInstances();
      const id = 1;
      facade.updateUser(id, sampleUserParams, true);
      expect(effects.updateUserOptimistic).toHaveBeenCalledWith(id, sampleUserParams);
    });
    it('should delete user using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'deleteUser');

      createInstances();
      const id = 1;
      facade.deleteUser(id, false);
      expect(effects.deleteUser).toHaveBeenCalledWith(id);
    });
    it('should delete user optimistically using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'deleteUserOptimistic');

      createInstances();
      const id = 1;
      facade.deleteUser(id, true);
      expect(effects.deleteUserOptimistic).toHaveBeenCalledWith(id);
    });
  });
});
