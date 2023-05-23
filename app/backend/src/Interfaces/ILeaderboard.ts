export interface ILeaderboard {
  name: number;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export type keyTypes = 'totalPoints' | 'totalVictories' | 'goalsBalance' | 'goalsFavor';
