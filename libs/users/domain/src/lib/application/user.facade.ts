import { Observable, map } from 'rxjs';

import { objectsSortOnKey } from '@trade-alerts/shared/util-common';

import { User, UserDetails } from '../entities/user.model';
import { userApiRxjsAjaxService } from '../infrastructure/rxjs-ajax/user-api-rxjs-ajax.service';

/*
  Facade for the Users domain which acts as a single API through which other feature
  components can interact with this domain.

  Hides details of state management, once this is integrated.
*/

class UserFacade {
  getUser(userId: number): Observable<User> {
    return userApiRxjsAjaxService.getUser(userId);
  }

  getUsers(pageIndex: number): Observable<User[]> {
    return userApiRxjsAjaxService
      .getUsers(pageIndex)
      .pipe(map((items: User[]) => objectsSortOnKey<User>(items, 'firstName')));
  }

  updateUser(userId: number, values: UserDetails): Observable<User> {
    return userApiRxjsAjaxService.updateUser(userId, values);
  }

  createUser(values: UserDetails): Observable<User> {
    return userApiRxjsAjaxService.createUser(values);
  }

  deleteUser(userId: number): Observable<number> {
    return userApiRxjsAjaxService.deleteUser(userId);
  }
}

export const userFacade: UserFacade = new UserFacade();
