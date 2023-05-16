import { NextFunction, Request, Response } from 'express';
import InvalidFieldError from '../errors/invalidFieldError';
import UnauthorizedError from '../errors/unauthorizedError';

const validateLogin = (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new InvalidFieldError('All fields must be filled');
  }

  const emailValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordValidation = password.length >= 6;

  if (!emailValidation.test(email) || !passwordValidation) {
    throw new UnauthorizedError('Invalid email or password');
  }
  next();
};

export default validateLogin;
