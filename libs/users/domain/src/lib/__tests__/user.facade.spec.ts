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
    it('should select usersReadState from user store', async () => {
      const value = { status: ApiStatus.Cancelled, error: null };
      jest
        .spyOn(UserStore.prototype, 'selectApiReadState')
        .mockImplementation(() => of(value));

      createInstances();
      await expect(firstValueFrom(facade.usersReadState$)).resolves.toEqual(value);
    });

    it('should select usersWriteState from user store', async () => {
      const value = { status: ApiStatus.Cancelled, error: null };
      jest
        .spyOn(UserStore.prototype, 'selectApiWriteState')
        .mockImplementation(() => of(value));

      createInstances();
      await expect(firstValueFrom(facade.usersWriteState$)).resolves.toEqual(value);
    });
    it('should select allUsers from user store', () => {
      const value = mockUsers;
      jest
        .spyOn(UserStore.prototype, 'selectAllUsers')
        .mockImplementation(() => of(value));

      createInstances();
      return expect(firstValueFrom(facade.allUsers$)).resolves.toEqual(value);
    });
    it('should select currentUser from user store', async () => {
      const value = mockUserEntities[1] as User;
      jest
        .spyOn(UserStore.prototype, 'selectCurrentUser')
        .mockImplementation(() => of(value));

      createInstances();
      await expect(firstValueFrom(facade.currentUser$)).resolves.toEqual(value);
    });
    it('should select a user based on a given id from user store', async () => {
      const id = 1;
      jest
        .spyOn(UserStore.prototype, 'selectUser')
        .mockImplementation((id: number) => of(mockUserEntities[id] as User));

      createInstances();
      await expect(firstValueFrom(facade.selectUser(id))).resolves.toEqual(
        mockUserEntities[id]
      );
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
    it('should clearCurrentUser using user store', () => {
      jest.spyOn(UserStore.prototype, 'onClearCurrentUser');
      createInstances();

      facade.clearCurrentUser();
      expect(store.onClearCurrentUser).toHaveBeenCalled();
    });
    it('should resetReadState using user store', () => {
      jest.spyOn(UserStore.prototype, 'onReadIdle');
      // jest.spyOn(UserFacade.prototype, 'resetReadState');
      createInstances();

      facade.resetReadState();
      expect(store.onReadIdle).toHaveBeenCalled();
    });
    it('should resetWriteState using user store', () => {
      jest.spyOn(UserStore.prototype, 'onWriteIdle');
      createInstances();

      facade.resetWriteState();
      expect(store.onWriteIdle).toHaveBeenCalled();
    });
    it('should loadUser using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'loadUser');
      createInstances();

      const id = 1;
      facade.loadUser(id);
      expect(effects.loadUser).toHaveBeenCalledWith(id);
    });
    it('should loadUsers using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'loadUsers');
      createInstances();

      facade.loadUsers();
      expect(effects.loadUsers).toHaveBeenCalled();
    });
    it('should createUser using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'createUser');
      createInstances();

      facade.createUser(sampleUserParams);
      expect(effects.createUser).toHaveBeenCalledWith(sampleUserParams);
    });
    it('should updateUser using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'updateUser');
      createInstances();

      const id = 1;
      facade.updateUser(id, sampleUserParams, false);
      expect(effects.updateUser).toHaveBeenCalledWith(id, sampleUserParams);
    });
    it('should updateUser optimistically using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'updateUserOptimistic');
      createInstances();

      const id = 1;
      facade.updateUser(id, sampleUserParams, true);
      expect(effects.updateUserOptimistic).toHaveBeenCalledWith(id, sampleUserParams);
    });
    it('should deleteUser using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'deleteUser');
      createInstances();

      const id = 1;
      facade.deleteUser(id, false);
      expect(effects.deleteUser).toHaveBeenCalledWith(id);
    });
    it('should deleteUser optimistically using user effects', () => {
      jest.spyOn(UserEffects.prototype, 'deleteUserOptimistic');
      createInstances();

      const id = 1;
      facade.deleteUser(id, true);
      expect(effects.deleteUserOptimistic).toHaveBeenCalledWith(id);
    });
  });
});
