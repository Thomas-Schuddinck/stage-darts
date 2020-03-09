import React from 'react';
import { Turn } from './Turn';
import { Player } from './Player';

export interface PlayerLeg {
    id: number;
    turns?: Turn[];
    player: Player;
    currentScore?: number;
}