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

  public async finish(req: Request, res: Response) {
    const { id } = req.params;
    const finished = await this.matchService.finish(id);
    if (finished) return res.status(200).json({ message: 'Finished' });
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const update = await this.matchService.updateMatch(id, homeTeamGoals, awayTeamGoals);
    if (update) return res.status(200).json({ message: update });
  }

  public async create(req: Request, res: Response) {
    const newMatch = req.body;
    const match = await this.matchService.create(newMatch);
    return res.status(201).json(match);
  }
}

export default MatchController;
