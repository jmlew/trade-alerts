import { Mapper } from '@trade-alerts/shared/data-access';

import { User } from '../entities/user.model';
import { UserRecord } from './user-api.model';

export class UserApiMapper implements Mapper<UserRecord, User> {
  mapFrom(input: UserRecord): User {
    if (input.id == null) {
      console.error('User record has no primary ID', input);
    }
    return {
      ...input,
    };
  }

  mapTo(input: User): UserRecord {
    return {
      ...input,
    };
  }
}
