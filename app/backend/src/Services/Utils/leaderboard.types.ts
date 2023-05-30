export type teamTypes = {
  homeOrAwayId: teamTypesId,
  homeOrAwayteam: team;
  goals: teamTypesGoals,
  oppositingTeamGoals: teamTypesGoals,
};

export type teamTypesId = 'homeTeamId' | 'awayTeamId';

export type team = 'homeTeam' | 'awayTeam';

export type teamTypesGoals = 'homeTeamGoals' | 'awayTeamGoals';

export type keyTypes = 'totalPoints' | 'totalVictories' | 'goalsBalance' | 'goalsFavor';
