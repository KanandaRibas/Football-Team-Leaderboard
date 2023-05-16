import * as express from 'express';
import teamsRoute from './TeamRouter';
import userRouter from './UserRouter';

const router = express.Router();

router.use('/teams', teamsRoute);
router.use('/login', userRouter);

export default router;
