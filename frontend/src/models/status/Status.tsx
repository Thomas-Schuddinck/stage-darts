import { AddThrow } from "./AddThrow";
import { NewTurn } from "./NewTurn";
import { EndGame } from "./EndGame";
import { NewLeg } from "./NewLeg";

export interface Status {
    status: number;
    addThrow: AddThrow;
    endGame: EndGame;
    newLeg: NewLeg;
    newturn: NewTurn;
}