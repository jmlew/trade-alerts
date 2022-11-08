import { User, UserDetails, UserRecord } from '@trade-alerts/users/domain';

import { getUserFormParams } from './user-params.utils';

describe('User Feature Entities', () => {
  const userDetails: UserDetails = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@sampleuser.com',
  };
  it('Returns user form params from existing user record', () => {
    const userRecord: UserRecord = {
      ...userDetails,
      id: 1,
      createdAt: '2018-07-16T07:32:20.421Z',
      updatedAt: '2018-07-16T07:32:20.421Z',
    };
    expect(getUserFormParams(userRecord)).toEqual(userDetails);
  });
  it('Returns user form params from existing user', () => {
    const user: User = {
      ...userDetails,
      id: 1,
    };
    expect(getUserFormParams(user)).toEqual(userDetails);
  });
  it('Returns user form params from empty user', () => {
    const empty: UserDetails = {
      firstName: '',
      lastName: '',
      email: '',
    };
    expect(getUserFormParams(undefined)).toEqual(empty);
  });
});
