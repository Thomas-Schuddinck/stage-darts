import { Player } from './Player';

export interface LeaderboardStats {
    player: Player;
    numberOfWins: number;
    totalScoreThrown: number;
    percentageSixties: number;
    percentageWins: number;
}