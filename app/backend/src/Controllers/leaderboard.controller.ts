import { Request, Response } from 'express';
import LeaderboardService from '../Services/leaderboard.service';

class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) { }

  public async getAllTeams(req: Request, res: Response) {
    const leaderboard = await this.leaderboardService.sortLeaderboard(req.path);
    return res.status(200).json(leaderboard);
  }
}

export default LeaderboardController;
