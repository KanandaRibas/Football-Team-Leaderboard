import { Router } from 'express';
import MatchController from '../Controllers/match.controller';
import validateToken from '../Middlewares/validateToken';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get('/', (req, res) => matchController.getAll(req, res));
matchRouter.patch(
  '/:id/finish',
  validateToken,
  (req, res) => matchController.finish(req, res),
);
matchRouter.patch(
  '/:id',
  validateToken,
  (req, res) => matchController.updateMatch(req, res),
);
matchRouter.post(
  '/',
  validateToken,
  (req, res) => matchController.create(req, res),
);

export default matchRouter;
