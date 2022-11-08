import { User, UserDetails, UserRecord } from '@trade-alerts/users/domain';

export function getUserFormParams(user?: UserRecord | User): UserDetails {
  if (user == null) {
    return {
      firstName: '',
      lastName: '',
      email: '',
    };
  } else {
    const { email, firstName, lastName } = user;
    return { email, firstName, lastName };
  }
}
