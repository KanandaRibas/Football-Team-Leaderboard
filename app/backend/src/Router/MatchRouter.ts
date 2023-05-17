import { Router } from 'express';
import MatchController from '../Controllers/match.controller';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get('/', (req, res) => matchController.getAll(req, res));

export default matchRouter;
