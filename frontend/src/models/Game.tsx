
import { LegGroup } from './LegGroup';
import { PlayerDetail } from './PlayerDetail';

export interface Game {
    id: number;
    beginDate: Date
    endDate: Date
    players: PlayerDetail[];
    legGroups: LegGroup[];
}