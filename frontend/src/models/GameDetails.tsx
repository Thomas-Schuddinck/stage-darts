import React from 'react';
import { Game } from './Game';
import { Player } from './Player';
import { PlayerLeg } from './PlayerLeg';
import { LegGroup } from './LegGroup';

export interface GameDetails {
    game?: Game;
    currentplayer?: Player;
    nextplayer?: Player;
    lastThrow?: number;
    currentLeg?: PlayerLeg;
    CurrentLegGroup?: LegGroup;
};
    