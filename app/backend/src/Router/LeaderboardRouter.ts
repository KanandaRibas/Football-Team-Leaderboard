import { Router } from 'express';
import LeaderboardController from '../Controllers/leaderboard.controller';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get('/home', (req, res) => leaderboardController.getAllTeams(req, res));
leaderboardRouter.get('/away', (req, res) => leaderboardController.getAllTeams(req, res));

export default leaderboardRouter;
