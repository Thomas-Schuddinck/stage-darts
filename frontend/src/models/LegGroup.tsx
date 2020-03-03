import React from 'react';
import { Turn } from './Turn';
import { Player } from './Player';
import { PlayerLeg } from './PlayerLeg';

export interface LegGroup {
    id?: number;
    playerLegs?: PlayerLeg[];
}