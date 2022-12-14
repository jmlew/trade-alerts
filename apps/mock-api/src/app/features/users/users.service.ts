import { Injectable } from '@nestjs/common';
import { users } from '@trade-alerts/mocks';
import * as fromUtilsLib from '@trade-alerts/shared/util-common';
import { EntitiesManagerService } from '@trade-alerts/shared/util-common';
import {
  CreateUserResponse,
  DeleteUserResponse,
  GetUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
  User,
  UserDetails,
} from '@trade-alerts/users/domain';

@Injectable()
export class UsersService extends EntitiesManagerService<User, number> {
  constructor() {
    const primaryKey: keyof User = 'id';
    super(primaryKey);
    this.initDb();
  }

  initDb() {
    const items: User[] = { ...users }.data;
    this.setEntities(items);
  }

  getAllUsers(): GetUsersResponse {
    const data: User[] = this.selectAll();
    return { data };
  }

  getUserById(id: number): GetUserResponse {
    const data: User = this.selectOne(id);
    return { data };
  }

  createUser(params: UserDetails): CreateUserResponse {
    const user: CreateUserResponse = this.normaliseNewUser(params);
    this.setEntity(user);
    return user;
  }

  updateUser(id: number, params: User): UpdateUserResponse {
    const user: UpdateUserResponse = this.normaliseEditedUser(id, params);
    this.updateEntity(id, user);
    return user;
  }

  deleteUser(id: number): DeleteUserResponse {
    this.removeEntity(id);
    return { id, status: 'removed' };
  }

  deleteUsers(ids: number[]): number[] {
    this.removeEntities(ids);
    return ids;
  }

  doesUserExist(id: number): boolean {
    return this.doesEntityExist(id);
  }

  isFieldDuplicate(
    user: UserDetails,
    field: string,
    ignoreValue: unknown = null
  ): boolean {
    const users: User[] = this.selectAll();
    return users
      .filter((item: User) => ignoreValue === null || item[field] !== ignoreValue)
      .some((item: User) => item[field] === user[field]);
  }

  private normaliseNewUser(params: UserDetails): CreateUserResponse {
    const ids: number[] = this.selectIds();
    const id: number = ids.length > 0 ? Math.max(...ids) + 1 : 1;
    return { ...params, id, createdAt: this.timestamp() };
  }

  private normaliseEditedUser(id: number, user: User) {
    return { ...user, id, updatedAt: this.timestamp() };
  }

  private timestamp(): string {
    return fromUtilsLib.getCurrentDateToIso();
  }
}
