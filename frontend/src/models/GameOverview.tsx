import React from 'react';
import { Game } from './Game';
import { LegWinner } from './LegWinner';

export interface GameOverview {
    winner: string;
    legWinners: LegWinner[];
    game: Game;
}