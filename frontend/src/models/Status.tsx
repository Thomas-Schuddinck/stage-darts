import { GameDetails } from "./GameDetails";

export interface Status {
    status: number;
    winner: string;
    gameDTO: GameDetails;
}