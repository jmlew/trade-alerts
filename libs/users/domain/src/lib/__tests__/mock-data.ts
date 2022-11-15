import { users } from '@trade-alerts/mocks';
import { Entity } from '@trade-alerts/shared/util-common';

import { User } from '../entities/user.model';

function getSampleData<T>(items: T[]) {
  return items.filter((item: T, index: number) => index < 2);
}

export const mockUsers = getSampleData(users.data);
export const mockUserEntities: Entity<User> = { 1: mockUsers[0], 2: mockUsers[1] };
