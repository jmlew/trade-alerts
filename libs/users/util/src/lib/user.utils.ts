import { User, UserDetails } from '@kdb-dash/users/domain';

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
