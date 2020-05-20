import { Game } from "./Game";
import { TournamentStat } from "./TournamentStat";

export interface Stats {
    numberOfWins: number;
    numberOfMisses: number;
    numberOfSixties: number;
    totalScoreThrown: number;
    totalNumberDartsThrown: number;
    percentageSixties: number;
    averageScoreThrown: number;
    percentageWins: number;
    percentageBoardHits: number;
    history: Game[];
    tournamentHistory: TournamentStat[];
    numberOfLosses: number;
}