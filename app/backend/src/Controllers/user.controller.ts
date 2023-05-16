import { Request, Response } from 'express';
// import 'dotenv/config';
import { SignOptions } from 'jsonwebtoken';
import Jwt = require('jsonwebtoken');

import UserService from '../Services/user.service';
import { IUserRequest } from '../Interfaces/IUserRequest';

class UserController {
  constructor(private userService = new UserService()) { }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const userLoged = await this.userService.login(email, password);
    if (!userLoged) return res.status(401).json({ message: 'Invalid email or password' });
    const secret = process.env.JWT_SECRET || 'secrettoken';
    const jwtConfig: SignOptions = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const { id, role } = userLoged;
    const token = Jwt.sign({ id, role }, secret, jwtConfig);

    return res.status(200).json({ token });
  }

  public static getUserRole(req: IUserRequest, res: Response) {
    const userLoged = req.user;
    if (userLoged) {
      const { role } = userLoged;
      return res.status(200).json({ role });
    }
  }
}

export default UserController;
