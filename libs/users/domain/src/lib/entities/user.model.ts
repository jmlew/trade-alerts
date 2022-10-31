export interface UserDetails {
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface User extends UserDetails {
  id: number;
}
