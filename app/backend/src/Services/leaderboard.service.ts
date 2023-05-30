import { ILeaderboard } from '../Interfaces/ILeaderboard';
import { IMatch } from '../Interfaces/IMatch';
import { keyTypes, teamTypes } from './Utils/leaderboard.types';
import MatchService from './match.service';

class LeaderboardService {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public static sortTeams(array: ILeaderboard[], keys: keyTypes[], next: keyTypes): ILeaderboard[] {
    return array.sort((a: ILeaderboard, b: ILeaderboard) => {
      if (keys.every((key) => b[key] === a[key])) return b[next] - a[next];
      return 0;
    });
  }

  public async sortLeaderboard(path: string): Promise<ILeaderboard[]> {
    const array = await this.leaderboard(path);
    console.log(path);
    const sort1 = array.sort((a, b) => b.totalPoints - a.totalPoints);
    const sort2 = LeaderboardService.sortTeams(sort1, ['totalPoints'], 'totalVictories');
    const sort3 = LeaderboardService
      .sortTeams(sort2, ['totalPoints', 'totalVictories'], 'goalsBalance');
    const sort4 = LeaderboardService
      .sortTeams(sort3, ['totalPoints', 'totalVictories', 'goalsBalance'], 'goalsFavor');
    return sort4;
  }

  public static verifyPath(path: string) {
    let homeOrAway: teamTypes = {
      homeOrAwayId: 'homeTeamId',
      goals: 'homeTeamGoals',
      oppositingTeam: 'awayTeamGoals',
      homeOrAwayteam: 'homeTeam',
    };
    if (path === '/away') {
      homeOrAway = {
        homeOrAwayId: 'awayTeamId',
        goals: 'awayTeamGoals',
        oppositingTeam: 'homeTeamGoals',
        homeOrAwayteam: 'awayTeam',
      };
    }
    return homeOrAway;
  }

  public async leaderboard(path: string): Promise<ILeaderboard[]> {
    const matches = await this.matchService.getAllByProgress('false');
    const distinctTeamsId = LeaderboardService.filterDuplicated(matches, path);
    const columns = distinctTeamsId.map((id) => ({
      name: LeaderboardService.findTeamName(matches, id, path),
      totalPoints: LeaderboardService.totalPoints(matches, id, path),
      totalGames: LeaderboardService.totalGames(matches, id, path),
      totalVictories: LeaderboardService.totalVictories(matches, id, path),
      totalDraws: LeaderboardService.totalDraws(matches, id, path),
      totalLosses: LeaderboardService.totalLosses(matches, id, path),
      goalsFavor: LeaderboardService.goalsFavor(matches, id, path),
      goalsOwn: LeaderboardService.goalsOwn(matches, id, path),
      goalsBalance: LeaderboardService.goalsBalance(matches, id, path),
      efficiency: LeaderboardService.efficiency(matches, id, path),
    }));
    return columns as unknown as ILeaderboard[];
  }

  public static filterDuplicated(matches: IMatch[], path: string) {
    const { homeOrAwayId } = this.verifyPath(path);
    const ids = matches.map((match) => match[homeOrAwayId]);
    const filteredIds = [...new Set(ids)];
    return filteredIds;
  }

  public static findTeamName(matches: IMatch[], id: number, path: string) {
    const { homeOrAwayId, homeOrAwayteam } = this.verifyPath(path);
    const matchById = matches.find((match) => match[homeOrAwayId] === id);
    if (matchById) {
      return matchById[homeOrAwayteam].teamName;
    }
  }

  public static totalPoints(maches: IMatch[], id: number, path: string) {
    return (LeaderboardService.totalVictories(maches, id, path) * 3) // vitorias soma 3
    + LeaderboardService.totalDraws(maches, id, path); // empates soma 1
  }

  public static totalGames(matches: IMatch[], id: number, path: string) {
    return matches.reduce((acc: number, match) => {
      const { homeOrAwayId } = this.verifyPath(path);
      let total = acc;
      if (match[homeOrAwayId] === id) total += 1;
      return total;
    }, 0);
  }

  public static totalVictories(matches: IMatch[], id: number, path: string) {
    const { homeOrAwayId, goals, oppositingTeam } = this.verifyPath(path);
    return matches.reduce((acc: number, match) => {
      let total = acc;
      if (match[homeOrAwayId] === id
        && match[goals] > match[oppositingTeam]) total += 1;
      return total;
    }, 0);
  }

  public static totalLosses(matches: IMatch[], id: number, path: string) {
    const { homeOrAwayId, goals, oppositingTeam } = this.verifyPath(path);
    return matches.reduce((acc: number, match) => {
      let total = acc;
      if (match[homeOrAwayId] === id
        && match[goals] < match[oppositingTeam]) total += 1;
      return total;
    }, 0);
  }

  public static totalDraws(matches: IMatch[], id: number, path: string) {
    const { homeOrAwayId, goals, oppositingTeam } = this.verifyPath(path);
    return matches.reduce((acc: number, match) => {
      let total = acc;
      if (match[homeOrAwayId] === id
        && match[goals] === match[oppositingTeam]) total += 1;
      return total;
    }, 0);
  }

  public static goalsFavor(matches: IMatch[], id: number, path: string) {
    const { homeOrAwayId, goals } = this.verifyPath(path);
    return matches.reduce((acc: number, match) => {
      if (match[homeOrAwayId] === id) {
        return match[goals] + acc;
      }
      return acc;
    }, 0);
  }

  public static goalsOwn(matches: IMatch[], id: number, path: string) {
    const { homeOrAwayId, oppositingTeam } = this.verifyPath(path);
    return matches.reduce((acc: number, match) => {
      if (match[homeOrAwayId] === id) {
        return match[oppositingTeam] + acc;
      }
      return acc;
    }, 0);
  }

  public static goalsBalance(maches: IMatch[], id: number, path: string) {
    return LeaderboardService.goalsFavor(maches, id, path)
    - LeaderboardService.goalsOwn(maches, id, path);
  }

  public static efficiency(maches: IMatch[], id: number, path: string) {
    const efficiencyCalculator = LeaderboardService.totalPoints(maches, id, path)
    / (LeaderboardService.totalGames(maches, id, path) * 3);
    const percent = (efficiencyCalculator * 100).toFixed(2);
    return percent;
  }
}

export default LeaderboardService;
