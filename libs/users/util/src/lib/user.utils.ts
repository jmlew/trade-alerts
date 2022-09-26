import { User, UserDetails } from '@trade-alerts/users/domain';

export function getUserFormParams(user?: User): UserDetails {
  if (user == null) {
    return {
      firstName: '',
      lastName: '',
      email: '',
    };
  } else {
    const { id: remove, ...initialValues } = user;
    return initialValues;
  }
}
