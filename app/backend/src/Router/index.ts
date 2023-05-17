import * as express from 'express';
import teamsRoute from './TeamRouter';
import userRouter from './UserRouter';
import matchRouter from './MatchRouter';

const router = express.Router();

router.use('/teams', teamsRoute);
router.use('/login', userRouter);
router.use('/matches', matchRouter);

export default router;
