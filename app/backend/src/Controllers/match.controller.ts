import { Request, Response } from 'express';
import MatchService from '../Services/match.service';

class MatchController {
  constructor(private matchService = new MatchService()) { }

  public async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    let matches = [];
    if (inProgress) {
      matches = await this.matchService.getAllByProgress(inProgress as string);
    } else {
      matches = await this.matchService.getAll();
    }
    return res.status(200).json(matches);
  }
}

export default MatchController;
