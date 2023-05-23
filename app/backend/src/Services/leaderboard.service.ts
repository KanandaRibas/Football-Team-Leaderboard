import { ILeaderboard, keyTypes } from '../Interfaces/ILeaderboard';
import { IMatch } from '../Interfaces/IMatch';
import MatchService from './match.service';

class LeaderboardService {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async finishedMatches() {
    const matches = await this.matchService.getAllByProgress('false');
    return matches;
  }

  public static sortTeams(array: ILeaderboard[], keys: keyTypes[], next: keyTypes): ILeaderboard[] {
    return array.sort((a: ILeaderboard, b: ILeaderboard) => {
      if (keys.every((key) => b[key] === a[key])) return b[next] - a[next];
      return 0;
    });
  }

  public async sortLeaderboard(): Promise<ILeaderboard[]> {
    const array = await this.leaderboard();
    const sort1 = array.sort((a, b) => b.totalPoints - a.totalPoints);
    const sort2 = LeaderboardService.sortTeams(sort1, ['totalPoints'], 'totalVictories');
    const sort3 = LeaderboardService
      .sortTeams(sort2, ['totalPoints', 'totalVictories'], 'goalsBalance');
    const sort4 = LeaderboardService
      .sortTeams(sort3, ['totalPoints', 'totalVictories', 'goalsBalance'], 'goalsFavor');
    return sort4;
  }

  public async leaderboard(): Promise<ILeaderboard[]> {
    const matches = await this.finishedMatches();
    const filteredTeams = LeaderboardService.filterDuplicated(matches);
    const columns = filteredTeams.map((id) => ({
      name: LeaderboardService.findTeamName(matches, id),
      totalPoints: LeaderboardService.totalPoints(matches, id),
      totalGames: LeaderboardService.totalGames(matches, id),
      totalVictories: LeaderboardService.totalVictories(matches, id),
      totalDraws: LeaderboardService.totalDraws(matches, id),
      totalLosses: LeaderboardService.totalLosses(matches, id),
      goalsFavor: LeaderboardService.goalsFavor(matches, id),
      goalsOwn: LeaderboardService.goalsOwn(matches, id),
      goalsBalance: LeaderboardService.goalsBalance(matches, id),
      efficiency: LeaderboardService.efficiency(matches, id),
    }));
    return columns as unknown as ILeaderboard[];
  }

  public static filterDuplicated(matches: IMatch[]) {
    const ids = matches.map((match) => match.homeTeamId);
    const filteredIds = [...new Set(ids)];
    return filteredIds;
  }

  public static findTeamName(matches: IMatch[], id: number) {
    const matchById = matches.find((match) => match.homeTeamId === id);
    if (matchById) return matchById.homeTeam.teamName;
  }

  public static totalPoints(maches: IMatch[], id: number) {
    return (LeaderboardService.totalVictories(maches, id) * 3) // vitorias soma 3
    + LeaderboardService.totalDraws(maches, id); // empates soma 1
  }

  public static totalGames(matches: IMatch[], id: number) {
    return matches.reduce((acc: number, match) => {
      let total = acc;
      if (match.homeTeamId === id) total += 1;
      return total;
    }, 0);
  }

  public static totalVictories(matches: IMatch[], id: number) {
    return matches.reduce((acc: number, match) => {
      let total = acc;
      if (match.homeTeamId === id
        && match.homeTeamGoals > match.awayTeamGoals) total += 1;
      return total;
    }, 0);
  }

  public static totalLosses(matches: IMatch[], id: number) {
    return matches.reduce((acc: number, match) => {
      let total = acc;
      if (match.homeTeamId === id
        && match.homeTeamGoals < match.awayTeamGoals) total += 1;
      return total;
    }, 0);
  }

  public static totalDraws(matches: IMatch[], id: number) {
    return matches.reduce((acc: number, match) => {
      let total = acc;
      if (match.homeTeamId === id
        && match.homeTeamGoals === match.awayTeamGoals) total += 1;
      return total;
    }, 0);
  }

  public static goalsFavor(matches: IMatch[], id: number) {
    return matches.reduce((acc: number, match) => {
      if (match.homeTeamId === id) {
        return match.homeTeamGoals + acc;
      }
      return acc;
    }, 0);
  }

  public static goalsOwn(matches: IMatch[], id: number) {
    return matches.reduce((acc: number, match) => {
      if (match.homeTeamId === id) {
        return match.awayTeamGoals + acc;
      }
      return acc;
    }, 0);
  }

  public static goalsBalance(maches: IMatch[], id: number) {
    return LeaderboardService.goalsFavor(maches, id)
    - LeaderboardService.goalsOwn(maches, id);
  }

  public static efficiency(maches: IMatch[], id: number) {
    const efficiencyCalculator = LeaderboardService.totalPoints(maches, id)
    / (LeaderboardService.totalGames(maches, id) * 3);
    const percent = (efficiencyCalculator * 100).toFixed(2);
    return percent;
  }
}

export default LeaderboardService;