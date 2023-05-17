import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import { IMatch } from '../Interfaces/IMatch';

class MatchService {
  constructor(private matchModel = Match) { }

  public async getAll() {
    const matches = await this.matchModel.findAll({ include: [
      { model: Team, as: 'homeTeam', attributes: ['teamName'] },
      { model: Team, as: 'awayTeam', attributes: ['teamName'] },
    ] });
    return matches as IMatch[];
  }

  public async getAllByProgress(q: string): Promise<IMatch[]> {
    const matches = await this.getAll();
    return matches.filter((match) => {
      if (q === 'true') return match.inProgress === true;
      return match.inProgress === false;
    });
  }

  public async finish(id: string) {
    const match = await this.matchModel.findOne({ where: { id } });
    if (match) {
      match.inProgress = false;
      await match.save();
    }
    return match;
  }

  public async updateMatch(id: string, homeTeamGoals: string, awayTeamGoals: string) {
    const match = await this.matchModel.findOne({ where: { id } });
    if (match) {
      match.homeTeamGoals = +homeTeamGoals;
      match.awayTeamGoals = +awayTeamGoals;
      await match.save();
    }
    return match;
  }
}
export default MatchService;
