import MatchModel from '../database/models/MatchModel';
import { ITeam } from './ITeam';

export interface IMatch extends MatchModel {
  homeTeam: ITeam,
  awayTeam: ITeam,
}
