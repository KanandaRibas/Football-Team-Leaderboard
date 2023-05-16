export interface IUser {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface IUserRole {
  id?: number;
  role: string;
}
