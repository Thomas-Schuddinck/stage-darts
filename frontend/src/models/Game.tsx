
import { LegGroup } from './LegGroup';
import { PlayerDetail } from './PlayerDetail';

export interface Game {
    id: number;
    beginDate: string
    endDate: string
    players: PlayerDetail[];
    legGroups?: LegGroup[];
    bracketSectorNumber: number;
    bracketStageNumber: number;
    canStart: boolean;
}