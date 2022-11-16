import { of, throwError } from 'rxjs';

import { objectsSortOnKey } from '@trade-alerts/shared/util-common';

import { User } from '../entities/user.model';
import { UserApiRxjsAjaxService } from '../infrastructure/rxjs-ajax/user-api-rxjs-ajax.service';
import { UserApiMapper } from '../infrastructure/user-api.mapper';
import { UserEffects } from '../state/user.effects';
import { UserStore } from '../state/user.store';
import { mockUsers } from './mock-data';

let store: UserStore;
let effects: UserEffects;
let dataService: UserApiRxjsAjaxService;

/**
 * Instantiates all dependancies for mocking the tests. To be called after spies and
 * mocks have been applied to the relevant methods on the class prototypes for each test.
 */
function createInstances() {
  store = UserStore.getInstance();
  dataService = new UserApiRxjsAjaxService(new UserApiMapper());
  effects = new UserEffects(store, dataService);
}

describe(UserEffects, () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  it('should load user and update the store', () => {
    const user: User = mockUsers[0];

    jest.spyOn(UserStore.prototype, 'onReadPending');
    jest.spyOn(UserStore.prototype, 'onLoadUserCompleted');
    jest.spyOn(UserStore.prototype, 'selectUserValue').mockReturnValue(null);
    jest.spyOn(UserApiRxjsAjaxService.prototype, 'read').mockReturnValue(of(user));

    createInstances();

    effects.loadUser(user.id);
    expect(store.onReadPending).toHaveBeenCalled();
    expect(dataService.read).toHaveBeenCalledWith(user.id);
    expect(store.onLoadUserCompleted).toHaveBeenCalledWith(user);
  });

  it('should optimistically load user and update the store', () => {
    const user: User = mockUsers[0];

    jest.spyOn(UserStore.prototype, 'onReadPending');
    jest.spyOn(UserStore.prototype, 'onLoadUserCompleted');
    jest.spyOn(UserStore.prototype, 'selectUserValue').mockReturnValue(user);
    jest.spyOn(UserApiRxjsAjaxService.prototype, 'read');

    createInstances();

    effects.loadUser(user.id);
    expect(store.onReadPending).not.toHaveBeenCalled();
    expect(dataService.read).not.toHaveBeenCalled();
    expect(store.onLoadUserCompleted).toHaveBeenCalledWith(user);
  });
  it('should throw error on failed load user and update the store', () => {
    const error = 'load user error';
    const id = 66;
    jest.spyOn(UserStore.prototype, 'onReadPending');
    jest.spyOn(UserStore.prototype, 'onReadFailed');
    jest.spyOn(UserStore.prototype, 'selectUserValue').mockReturnValue(null);
    jest
      .spyOn(UserApiRxjsAjaxService.prototype, 'read')
      .mockReturnValue(throwError(() => error));

    createInstances();

    effects.loadUser(id);
    expect(store.onReadPending).toHaveBeenCalled();
    expect(dataService.read).toHaveBeenCalledWith(id);
    expect(store.onReadFailed).toHaveBeenCalledWith(error);
  });
  it('should load users and update the store', () => {
    const sortedUsers = objectsSortOnKey<User>(mockUsers, 'firstName');
    jest.spyOn(UserStore.prototype, 'onReadPending');
    jest.spyOn(UserStore.prototype, 'onLoadUsersCompleted');
    jest
      .spyOn(UserApiRxjsAjaxService.prototype, 'readAll')
      .mockReturnValue(of(mockUsers));

    createInstances();

    effects.loadUsers();
    expect(store.onReadPending).toHaveBeenCalled();
    expect(dataService.readAll).toHaveBeenCalled();
    expect(store.onLoadUsersCompleted).toHaveBeenCalledWith(sortedUsers);
  });
  it('should throw error on failed load users', () => {
    const error = 'load users error';
    jest.spyOn(UserStore.prototype, 'onReadPending');
    jest.spyOn(UserStore.prototype, 'onReadFailed');
    jest
      .spyOn(UserApiRxjsAjaxService.prototype, 'readAll')
      .mockReturnValue(throwError(() => error));

    createInstances();

    effects.loadUsers();
    expect(store.onReadPending).toHaveBeenCalled();
    expect(dataService.readAll).toHaveBeenCalled();
    expect(store.onReadFailed).toHaveBeenCalledWith(error);
  });
  it('should create user and update the store', () => {
    const user: User = mockUsers[0];
    const params = { ...user, id: undefined };

    jest.spyOn(UserStore.prototype, 'onWritePending');
    jest.spyOn(UserStore.prototype, 'onCreateUserCompleted');
    jest.spyOn(UserApiRxjsAjaxService.prototype, 'create').mockReturnValue(of(user));

    createInstances();

    effects.createUser(params);
    expect(store.onWritePending).toHaveBeenCalled();
    expect(dataService.create).toHaveBeenCalledWith(params);
    expect(store.onCreateUserCompleted).toHaveBeenCalledWith(user);
  });
  it('should throw error on failed create user', () => {
    const error = 'create user error';
    const params = { ...mockUsers[0], id: undefined };

    jest.spyOn(UserStore.prototype, 'onWritePending');
    jest.spyOn(UserStore.prototype, 'onWriteFailed');
    jest
      .spyOn(UserApiRxjsAjaxService.prototype, 'create')
      .mockReturnValue(throwError(() => error));

    createInstances();

    effects.createUser(params);
    expect(store.onWritePending).toHaveBeenCalled();
    expect(dataService.create).toHaveBeenCalledWith(params);
    expect(store.onWriteFailed).toHaveBeenCalledWith(error);
  });
  it('should update user and update the store', () => {
    const user: User = mockUsers[0];
    const id: number = user.id;
    const params = { email: 'email', firstName: 'firstName', lastName: 'lastName' };

    jest.spyOn(UserStore.prototype, 'onWritePending');
    jest.spyOn(UserStore.prototype, 'onUpdateUserCompleted');
    jest.spyOn(UserApiRxjsAjaxService.prototype, 'update').mockReturnValue(of(user));

    createInstances();

    effects.updateUser(id, params);
    expect(store.onWritePending).toHaveBeenCalled();
    expect(dataService.update).toHaveBeenCalledWith(id, params);
    expect(store.onUpdateUserCompleted).toHaveBeenCalledWith(id, params);
  });
  it('should throw error on failed update user', () => {
    const error = 'update user error';
    const id = 66;
    const params = { email: 'email', firstName: 'firstName', lastName: 'lastName' };

    jest.spyOn(UserStore.prototype, 'onWritePending');
    jest.spyOn(UserStore.prototype, 'onWriteFailed');
    jest
      .spyOn(UserApiRxjsAjaxService.prototype, 'update')
      .mockReturnValue(throwError(() => error));

    createInstances();

    effects.updateUser(id, params);
    expect(store.onWritePending).toHaveBeenCalled();
    expect(dataService.update).toHaveBeenCalledWith(id, params);
    expect(store.onWriteFailed).toHaveBeenCalledWith(error);
  });
  it('should optimistically update user and update the store', () => {
    const user: User = mockUsers[0];
    const id: number = user.id;
    const params = { email: 'email', firstName: 'firstName', lastName: 'lastName' };

    jest.spyOn(UserStore.prototype, 'onWritePending');
    const completedSpy = jest.spyOn(UserStore.prototype, 'onUpdateUserCompleted');
    const actionSpy = jest
      .spyOn(UserApiRxjsAjaxService.prototype, 'update')
      .mockReturnValue(of(user));

    createInstances();

    effects.updateUserOptimistic(id, params);
    expect(store.onWritePending).not.toHaveBeenCalled();
    expect(dataService.update).toHaveBeenCalledWith(id, params);
    expect(store.onUpdateUserCompleted).toHaveBeenCalledWith(id, params);

    const order = {
      action: actionSpy.mock.invocationCallOrder[0],
      complete: completedSpy.mock.invocationCallOrder[0],
    };
    expect(order.complete).toBeLessThan(order.action);
  });
  it('should throw error on failed optimistic update user', () => {
    const error = 'update user error';
    const id = 66;
    const params = { email: 'email', firstName: 'firstName', lastName: 'lastName' };

    jest.spyOn(UserStore.prototype, 'onWritePending');
    const failedSpy = jest.spyOn(UserStore.prototype, 'onWriteFailed');
    const completedSpy = jest.spyOn(UserStore.prototype, 'onUpdateUserCompleted');
    const actionSpy = jest
      .spyOn(UserApiRxjsAjaxService.prototype, 'update')
      .mockReturnValue(throwError(() => error));

    createInstances();

    effects.updateUserOptimistic(id, params);
    expect(store.onWritePending).not.toHaveBeenCalled();
    expect(dataService.update).toHaveBeenCalledWith(id, params);
    expect(store.onWriteFailed).toHaveBeenCalledWith(error);
    expect(store.onUpdateUserCompleted).toHaveBeenCalledWith(id, params);

    const order = {
      action: actionSpy.mock.invocationCallOrder[0],
      complete: completedSpy.mock.invocationCallOrder[0],
      failed: failedSpy.mock.invocationCallOrder[0],
    };
    expect(order.complete).toBeLessThan(order.action);
    expect(order.action).toBeLessThan(order.failed);
  });

  it('should delete user and update the store', () => {
    const user: User = mockUsers[0];
    const id: number = user.id;

    jest.spyOn(UserStore.prototype, 'onWritePending');
    jest.spyOn(UserStore.prototype, 'onDeleteUserCompleted');
    jest.spyOn(UserApiRxjsAjaxService.prototype, 'delete').mockReturnValue(of(id));

    createInstances();

    effects.deleteUser(id);
    expect(store.onWritePending).toHaveBeenCalled();
    expect(dataService.delete).toHaveBeenCalledWith(id);
    expect(store.onDeleteUserCompleted).toHaveBeenCalledWith(id);
  });
  it('should throw error on failed delete user', () => {
    const error = 'delete user error';
    const id = 66;

    jest.spyOn(UserStore.prototype, 'onWritePending');
    jest.spyOn(UserStore.prototype, 'onWriteFailed');
    jest
      .spyOn(UserApiRxjsAjaxService.prototype, 'delete')
      .mockReturnValue(throwError(() => error));

    createInstances();

    effects.deleteUser(id);
    expect(store.onWritePending).toHaveBeenCalled();
    expect(dataService.delete).toHaveBeenCalledWith(id);
    expect(store.onWriteFailed).toHaveBeenCalledWith(error);
  });
  it('should optimistically delete user and update the store', () => {
    const user: User = mockUsers[0];
    const id: number = user.id;

    jest.spyOn(UserStore.prototype, 'onWritePending');
    const completedSpy = jest.spyOn(UserStore.prototype, 'onDeleteUserCompleted');
    const actionSpy = jest
      .spyOn(UserApiRxjsAjaxService.prototype, 'delete')
      .mockReturnValue(of(id));

    createInstances();

    effects.deleteUserOptimistic(id);
    expect(store.onWritePending).not.toHaveBeenCalled();
    expect(dataService.delete).toHaveBeenCalledWith(id);
    expect(store.onDeleteUserCompleted).toHaveBeenCalledWith(id);

    const order = {
      action: actionSpy.mock.invocationCallOrder[0],
      complete: completedSpy.mock.invocationCallOrder[0],
    };
    expect(order.complete).toBeLessThan(order.action);
  });

  it('should throw error on failed optimistica delete user', () => {
    const error = 'delete user error';
    const id = 66;

    jest.spyOn(UserStore.prototype, 'onWritePending');
    const completedSpy = jest.spyOn(UserStore.prototype, 'onDeleteUserCompleted');
    const failedSpy = jest.spyOn(UserStore.prototype, 'onWriteFailed');
    const actionSpy = jest
      .spyOn(UserApiRxjsAjaxService.prototype, 'delete')
      .mockReturnValue(throwError(() => error));

    createInstances();

    effects.deleteUserOptimistic(id);
    expect(store.onWritePending).not.toHaveBeenCalled();
    expect(dataService.delete).toHaveBeenCalledWith(id);
    expect(store.onDeleteUserCompleted).toHaveBeenCalledWith(id);
    expect(store.onWriteFailed).toHaveBeenCalledWith(error);
    const order = {
      action: actionSpy.mock.invocationCallOrder[0],
      complete: completedSpy.mock.invocationCallOrder[0],
      failed: failedSpy.mock.invocationCallOrder[0],
    };
    expect(order.complete).toBeLessThan(order.action);
    expect(order.action).toBeLessThan(order.failed);
  });
});
