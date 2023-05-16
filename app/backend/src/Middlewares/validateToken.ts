import { NextFunction, Response } from 'express';
// import 'dotenv/config';
import Jwt = require('jsonwebtoken');
import UnauthorizedError from '../errors/unauthorizedError';
import { IUserRequest } from '../Interfaces/IUserRequest';
import { IUser } from '../Interfaces/IUser';

const secret = process.env.JWT_SECRET || 'secrettoken';

const validateToken = (req: IUserRequest, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new UnauthorizedError('Token not found');
  }

  try {
    const decoded = Jwt.verify(authorization, secret);
    req.user = decoded as IUser;
  } catch {
    throw new UnauthorizedError('Token must be a valid token');
  }
  next();
};

export default validateToken;
