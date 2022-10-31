// TODO: implement repository pattern wth a parser to convert db response into User to
// protect the view from datasource changes and insulate againt DTO interface changes
// instead of using the same interface throughout client app.
export interface UserRecord {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetUsersResponse {
  page?: number;
  perPage?: number;
  total?: number;
  totalPages?: number;
  data: UserRecord[];
}

export interface GetUserResponse {
  data: UserRecord;
}

export interface CreateUserResponse extends UserRecord {
  createdAt: string;
}

export interface UpdateUserResponse extends UserRecord {
  updatedAt: string;
}

export interface DeleteUserResponse {
  id: number;
  status: string;
}
