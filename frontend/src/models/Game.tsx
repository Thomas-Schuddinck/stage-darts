import React from 'react';
import { Player } from './Player';

export interface Game {
    id?: number;
    beginDate?: Date
    endDate?: Date
    players?: Player[];
    playerLegs?: [];
}