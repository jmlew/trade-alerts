import { of } from 'rxjs';

import { RenderHookResult, act, renderHook } from '@testing-library/react';
import { ApiState, ApiStatus } from '@trade-alerts/shared/data-access';
import { User, UserDetails, userFacade } from '@trade-alerts/users/domain';

import {
  CreateUserViewModelResult,
  CreateUserViewModel as useVM,
} from '../containers/CreateUserViewModel';

jest.mock('@trade-alerts/users/domain');

const mockedFacade = userFacade as jest.Mocked<typeof userFacade>;

describe('CreateUserViewModel hook', () => {
  let vm: RenderHookResult<CreateUserViewModelResult, void>;
  const sampleUserParams: UserDetails = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@sampleuser.com',
  };
  const sampleUser: User = { ...sampleUserParams, id: 1 };
  const apiWriteState: ApiState = {
    status: ApiStatus.Idle,
    error: null,
  };
  beforeEach(() => {
    mockedFacade.usersWriteState$ = of(apiWriteState);
    mockedFacade.currentUser$ = of(null);
    vm = renderHook(() => useVM(mockedFacade));
  });
  it('should call resetWriteState method on facade', () => {
    act(() => {
      vm.result.current.resetApiState();
    });
    expect(mockedFacade.resetWriteState).toHaveBeenCalled();
  });
  it('should call clearCurrentUser method on facade', () => {
    act(() => {
      vm.result.current.clearCurrentUserId();
    });
    expect(mockedFacade.clearCurrentUserId).toHaveBeenCalled();
  });
  it('should call createUser method on facade', () => {
    act(() => {
      vm.result.current.createUser(sampleUserParams);
    });
    expect(mockedFacade.createUser).toHaveBeenCalledWith(sampleUserParams);
  });

  it('should get updated api write state', () => {
    expect(vm.result.current.apiStateRef.isIdle()).toBe(true);
    expect(vm.result.current.apiStateRef.isPending()).toBe(false);
    expect(vm.result.current.apiStateRef.isCompleted()).toBe(false);
    mockedFacade.usersWriteState$ = of({ ...apiWriteState, status: ApiStatus.Completed });
    vm.rerender();
    expect(vm.result.current.apiStateRef.isIdle()).toBe(false);
    expect(vm.result.current.apiStateRef.isPending()).toBe(false);
    expect(vm.result.current.apiStateRef.isCompleted()).toBe(true);
    mockedFacade.usersWriteState$ = of({ ...apiWriteState, status: ApiStatus.Pending });
    vm.rerender();
    expect(vm.result.current.apiStateRef.isIdle()).toBe(false);
    expect(vm.result.current.apiStateRef.isPending()).toBe(true);
    expect(vm.result.current.apiStateRef.isCompleted()).toBe(false);
  });
  it('should get the current user from the facade', () => {
    expect(vm.result.current.user).toBe(null);
    act(() => {
      mockedFacade.currentUser$ = of(sampleUser);
    });
    vm.rerender();
    expect(vm.result.current.user).toEqual(sampleUser);
  });
  it('should get null current user when user is cleared from the facade', () => {
    act(() => {
      mockedFacade.currentUser$ = of(sampleUser);
    });
    vm.rerender();
    expect(vm.result.current.user).toEqual(sampleUser);
    act(() => {
      vm.result.current.clearCurrentUserId();
      mockedFacade.currentUser$ = of(null);
    });
    vm.rerender();
    expect(mockedFacade.clearCurrentUserId).toHaveBeenCalled();
    expect(vm.result.current.user).toEqual(null);
  });
});
