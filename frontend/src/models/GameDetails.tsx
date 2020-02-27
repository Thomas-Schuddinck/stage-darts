import React from 'react';
import { Game } from './Game';
import { Player } from './Player';
import { Set } from './Set';

export interface GameDetails {
    game?: Game;
    currentplayer?: Player;
    nextplayer?: Player;
    lastThrow?: number;
    currentSet?: Set;
    sets?: [];
};
    