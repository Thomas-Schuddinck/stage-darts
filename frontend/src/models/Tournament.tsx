import React from 'react';
import { Game } from './Game';
import { Player } from './Player';

export interface Tournament {
    name: string;
    players: Player[];
    games: Game[];
}