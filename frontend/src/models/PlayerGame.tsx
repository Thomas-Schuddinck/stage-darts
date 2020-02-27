import React from 'react';
import { Game } from './Game';
import { Player } from './Player';

export interface PlayerGame {
    game?: Game;
    player?: Player;
    sets?: [];
};
    