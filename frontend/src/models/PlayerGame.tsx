import React from 'react';
import { Game } from './Game';

export interface Player {
    game?: Game;
    player?: Player;
    sets?: [];
};
    