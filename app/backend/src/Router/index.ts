import * as express from 'express';
import teamsRoute from './TeamRouter';
import userRouter from './UserRouter';
import matchRouter from './MatchRouter';
import leaderboardRouter from './LeaderboardRouter';

const router = express.Router();

router.use('/teams', teamsRoute);
router.use('/login', userRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
