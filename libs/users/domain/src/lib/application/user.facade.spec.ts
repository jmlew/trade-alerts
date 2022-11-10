import { of } from 'rxjs';

import { ApiStatus } from '@trade-alerts/shared/data-access';
import { Entity } from '@trade-alerts/shared/util-common';

import { User, UserDetails } from '../entities/user.model';
import { userEffects } from '../state/user.effects';
import { userStore } from '../state/user.store';
import { userFacade } from './user.facade';

const mockedStore = userStore as jest.Mocked<typeof userStore>;
const mockedEffects = userEffects as jest.Mocked<typeof userEffects>;
const mockedFacade = userFacade as jest.Mocked<typeof userFacade>;

const allUsers: User[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@sampleuser.com',
  },
  {
    id: 2,
    firstName: 'Fred',
    lastName: 'Jackson',
    email: 'fred@sampleuser.com',
  },
];
const users: Entity<User> = {
  1: allUsers[0],
  2: allUsers[1],
};
const currentUserId: number | null = 1;
const apiReadState = { status: ApiStatus.Idle, error: null };
const apiWriteState = { status: ApiStatus.Idle, error: null };

describe('UserFacade', () => {
  xdescribe('Selectors', () => {
    // TODO: test observable values.
    beforeEach(() => {
      mockedStore.selectApiReadState.mockImplementation(() => of(apiReadState));
      mockedStore.selectApiWriteState.mockImplementation(() => of(apiWriteState));
      mockedStore.selectAllUsers.mockImplementation(() => of(allUsers));
      mockedStore.selectCurrentUser.mockImplementation(() =>
        of(users[currentUserId] as User)
      );
      mockedStore.selectUser.mockImplementation((id: number) => of(users[id] as User));
    });
    it('should select usersReadState from user store', () => {
      expect(userFacade.usersReadState$).toEqual(of(apiReadState));
    });
    it('should select usersWriteState from user store', () => {
      expect(userFacade.usersWriteState$).toEqual(of(apiWriteState));
    });
    it('should select allUsers from user store', () => {
      expect(userFacade.allUsers$).toEqual(of(allUsers));
    });
    it('should select currentUser from user store', () => {
      expect(userFacade.currentUser$).toEqual(of(users[currentUserId] as User));
    });
    it('should select a user based on a given id from user store', () => {
      const id = 1;
      expect(userFacade.selectUser(id)).toEqual(of(users[id] as User));
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
      jest.spyOn(userStore, 'onClearCurrentUser');
      userFacade.clearCurrentUser();
      expect(userStore.onClearCurrentUser).toHaveBeenCalled();
    });
    it('should resetReadState using user store', () => {
      jest.spyOn(userStore, 'onReadIdle');
      userFacade.resetReadState();
      expect(userStore.onReadIdle).toHaveBeenCalled();
    });
    it('should resetWriteState using user store', () => {
      jest.spyOn(userStore, 'onWriteIdle');
      userFacade.resetWriteState();
      expect(userStore.onWriteIdle).toHaveBeenCalled();
    });
    it('should loadUser using user effects', () => {
      jest.spyOn(userEffects, 'loadUser');
      const id = 1;
      userFacade.loadUser(id);
      expect(userEffects.loadUser).toHaveBeenCalledWith(id);
    });
    it('should loadUsers using user effects', () => {
      jest.spyOn(userEffects, 'loadUsers');
      userFacade.loadUsers();
      expect(userEffects.loadUsers).toHaveBeenCalled();
    });
    it('should createUser using user effects', () => {
      jest.spyOn(userEffects, 'createUser');
      userFacade.createUser(sampleUserParams);
      expect(userEffects.createUser).toHaveBeenCalledWith(sampleUserParams);
    });
    it('should updateUser using user effects', () => {
      jest.spyOn(userEffects, 'updateUser');
      const id = 1;
      userFacade.updateUser(id, sampleUserParams, false);
      expect(userEffects.updateUser).toHaveBeenCalledWith(id, sampleUserParams);
    });
    it('should updateUser optimistically using user effects', () => {
      jest.spyOn(userEffects, 'updateUserOptimistic');
      const id = 1;
      userFacade.updateUser(id, sampleUserParams, true);
      expect(userEffects.updateUserOptimistic).toHaveBeenCalledWith(id, sampleUserParams);
    });
    it('should deleteUser using user effects', () => {
      jest.spyOn(userEffects, 'deleteUser');
      const id = 1;
      userFacade.deleteUser(id, false);
      expect(userEffects.deleteUser).toHaveBeenCalledWith(id);
    });
    it('should deleteUser optimistically using user effects', () => {
      jest.spyOn(userEffects, 'deleteUserOptimistic');
      const id = 1;
      userFacade.deleteUser(id, true);
      expect(userEffects.deleteUserOptimistic).toHaveBeenCalledWith(id);
    });
    xit('should select from user store', () => {
      jest.spyOn(userStore, 'selectUser').mockImplementation((id: number) => {
        return of(users[id] as User);
      });
      const id = 1;
      userFacade.selectUser(id);
      expect(userStore.selectUser).toHaveBeenCalledWith(id);
      // TODO: test observable values.
      // expect(userStore.selectUser(id)).toEqual(of(users[id] as User));
    });
  });
});
