import { Router } from 'express';
import validateLogin from '../Middlewares/validateLogin';
import UserController from '../Controllers/user.controller';
import validateToken from '../Middlewares/validateToken';

const userController = new UserController();

const userRouter = Router();

userRouter.post('/', validateLogin, (req, res) => userController.login(req, res));
userRouter.get('/role', validateToken, (req, res) => UserController.getUserRole(req, res));

export default userRouter;
