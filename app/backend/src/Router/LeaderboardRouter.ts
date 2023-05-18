import { Router } from 'express';
import LeaderboardController from '../Controllers/leaderboard.controller';

const leaderboardController = new LeaderboardController();

const leaderboardRouter = Router();

leaderboardRouter.get('/home', (req, res) => leaderboardController.getAllHome(req, res));

export default leaderboardRouter;
