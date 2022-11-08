export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export type UserDetails = Omit<User, 'id'>;
