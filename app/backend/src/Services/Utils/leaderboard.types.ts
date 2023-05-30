export type teamTypes = {
  homeOrAwayId: teamTypesId,
  goals: teamTypesGoals,
  oppositingTeam: teamTypesGoals,
  homeOrAwayteam: team;
};

export type keyTypes = 'totalPoints' | 'totalVictories' | 'goalsBalance' | 'goalsFavor';

export type teamTypesId = 'homeTeamId' | 'awayTeamId';

export type teamTypesGoals = 'homeTeamGoals' | 'awayTeamGoals';

export type team = 'homeTeam' | 'awayTeam';
