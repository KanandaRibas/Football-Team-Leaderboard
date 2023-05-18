import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import { IMatch } from '../Interfaces/IMatch';
import UnprocessableError from '../errors/unprocessableError';
import NotFoundError from '../errors/notFoundError';

class MatchService {
  constructor(private matchModel = Match, private teamModel = Team) { }

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

  public async validateMatch(homeTeamId: number, awayTeamId: number) {
    const verifyHomeTeam = await this.teamModel.findOne({ where: { id: homeTeamId } });
    const verifyAwayTeam = await this.teamModel.findOne({ where: { id: awayTeamId } });
    if (awayTeamId === homeTeamId) {
      throw new UnprocessableError(
        'It is not possible to create a match with two equal teams',
      );
    }
    if (!verifyAwayTeam || !verifyHomeTeam) {
      throw new NotFoundError('There is no team with such id!');
    }
    return true;
  }

  public async create(newMatch: IMatch) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = newMatch;
    const inProgress = true;
    const validate = await this.validateMatch(homeTeamId, awayTeamId);
    if (validate) {
      const match = await this.matchModel.create({
        homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress });
      return match;
    }
    return null;
  }
}
export default MatchService;
