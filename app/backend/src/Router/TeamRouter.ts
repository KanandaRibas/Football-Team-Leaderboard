import { Router } from 'express';
import TeamController from '../Controllers/team.controller';

const teamController = new TeamController();

const teamRouter = Router();

teamRouter.get('/', (req, res) => teamController.getAll(req, res));
teamRouter.get('/:id', (req, res) => teamController.getTeamById(req, res));

export default teamRouter;
