import { firstValueFrom, of } from 'rxjs';

import { ApiStatus } from '@trade-alerts/shared/data-access';

import { UserFacade } from '../application/user.facade';
import { User, UserDetails } from '../entities/user.model';
import { UserApiRxjsAjaxService } from '../infrastructure/rxjs-ajax/user-api-rxjs-ajax.service';
import { UserApiMapper } from '../infrastructure/user-api.mapper';
import { UserEffects } from '../state/user.effects';
import { UserStore } from '../state/user.store';
import { mockUserEntities, mockUsers } from './mock-data';

let userStore: UserStore;
let userEffects: UserEffects;
let userFacade: UserFacade;
let dataService: UserApiRxjsAjaxService;

/**
 * Instantiates all dependancies for mocking the facade. To be called after spies and
 * mocks have been applied to the relevant methods on the class prototypes for each test.
 */
function instantiateMocks() {
  // Clear previous store state on current instance.
  userStore && userStore.onClear();
  // Instantiate user store instance.
  userStore = UserStore.getInstance();
  dataService = new UserApiRxjsAjaxService(new UserApiMapper());
  userEffects = new UserEffects(userStore, dataService);
  userFacade = new UserFacade(userStore, userEffects);
}

describe(UserFacade, () => {
  describe('Selectors', () => {
    afterAll(() => {
      jest.restoreAllMocks();
    });
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
      const value = mockUsers;
      jest
        .spyOn(UserStore.prototype, 'selectAllUsers')
        .mockImplementation(() => of(value));

      instantiateMocks();
      return expect(firstValueFrom(userFacade.allUsers$)).resolves.toEqual(value);
    });
    it('should select currentUser from user store', async () => {
      const value = mockUserEntities[1] as User;
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
        .mockImplementation((id: number) => of(mockUserEntities[id] as User));

      instantiateMocks();
      await expect(firstValueFrom(userFacade.selectUser(id))).resolves.toEqual(
        mockUserEntities[id]
      );
    });
  });

  describe('Actions', () => {
    afterAll(() => {
      jest.restoreAllMocks();
    });
    const sampleUserParams: UserDetails = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@sampleuser.com',
    };
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
