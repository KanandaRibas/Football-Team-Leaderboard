import { Request } from 'express';
import { IUser } from './IUser';

export interface IUserRequest extends Request {
  user?: Omit<IUser, 'password'>
}
