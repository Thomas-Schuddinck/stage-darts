import React from 'react';
import { Player } from './Player';
import { LegGroup } from './LegGroup';

export interface Game {
    id?: number;
    beginDate?: Date
    endDate?: Date
    players?: Player[];
    legGroups?: LegGroup[];
}