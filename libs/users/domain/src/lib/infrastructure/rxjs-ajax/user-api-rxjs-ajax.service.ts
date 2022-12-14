import { Observable, catchError, map, throwError } from 'rxjs';
import { AjaxError, AjaxResponse, ajax } from 'rxjs/ajax';

import { RepositoryObservable } from '@trade-alerts/shared/data-access';
import {
  getRxjsAjaxApiErrorMessage,
  isDev,
  isUseMockInDev,
} from '@trade-alerts/shared/data-access';

import { User, UserDetails } from '../../entities/user.model';
import { UserApiUri } from '../user-api.enum';
import { UserApiMapper } from '../user-api.mapper';
import {
  CreateUserResponse,
  DeleteUserResponse,
  GetUserResponse,
  GetUsersResponse,
  UpdateUserResponse,
  UserRecord,
} from '../user-api.model';

export class UserApiRxjsAjaxService implements RepositoryObservable<User, number> {
  private basePath: string;

  constructor(private mapper: UserApiMapper) {
    const baseUrl = isDev() && isUseMockInDev() ? UserApiUri.MockBase : UserApiUri.Base;
    this.basePath = `${baseUrl}${UserApiUri.Users}`;
  }

  read(userId: number): Observable<User> {
    const request: Observable<AjaxResponse<GetUserResponse>> = ajax.get<GetUserResponse>(
      `${this.basePath}/${userId}`
    );
    return request.pipe(
      map((response: AjaxResponse<GetUserResponse>) => response.response.data),
      map(this.mapper.mapFrom),
      catchError((error: AjaxError) =>
        throwError(() => getRxjsAjaxApiErrorMessage(error))
      )
    );
  }

  readAll(): Observable<User[]> {
    const params: URLSearchParams = new URLSearchParams();
    // params.append(UserApiParam.Page, `${pageIndex}`);
    const request: Observable<AjaxResponse<GetUsersResponse>> =
      ajax.get<GetUsersResponse>(`${this.basePath}?${params.toString()}`);
    return request.pipe(
      map((response: AjaxResponse<GetUsersResponse>) => response.response.data),
      map((data: UserRecord[]) => data.map(this.mapper.mapFrom)),
      catchError((error: AjaxError) =>
        throwError(() => getRxjsAjaxApiErrorMessage(error))
      )
    );
  }

  update(userId: number, values: UserDetails): Observable<User> {
    const request: Observable<AjaxResponse<UpdateUserResponse>> =
      ajax.put<UpdateUserResponse>(`${this.basePath}/${userId}`, values);
    return request.pipe(
      map((response: AjaxResponse<UpdateUserResponse>) => response.response),
      map(this.mapper.mapFrom),
      catchError((error: AjaxError) =>
        throwError(() => getRxjsAjaxApiErrorMessage(error))
      )
    );
  }

  create(values: UserDetails): Observable<User> {
    const request: Observable<AjaxResponse<CreateUserResponse>> =
      ajax.post<CreateUserResponse>(this.basePath, values);
    return request.pipe(
      map((response: AjaxResponse<CreateUserResponse>) => response.response),
      map(this.mapper.mapFrom),
      catchError((error: AjaxError) =>
        throwError(() => getRxjsAjaxApiErrorMessage(error))
      )
    );
  }

  delete(userId: number): Observable<number> {
    const request: Observable<AjaxResponse<DeleteUserResponse>> =
      ajax.delete<DeleteUserResponse>(`${this.basePath}/${userId}`);
    return request.pipe(
      map((response: AjaxResponse<DeleteUserResponse>) => response.response.id),
      catchError((error: AjaxError) =>
        throwError(() => getRxjsAjaxApiErrorMessage(error))
      )
    );
  }
}

export const userApiRxjsAjaxService: UserApiRxjsAjaxService = new UserApiRxjsAjaxService(
  new UserApiMapper()
);
