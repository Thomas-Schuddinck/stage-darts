import React from 'react';

export interface Game {
    id?: number;
    beginDate?: Date
    endDate?: Date
    players?: [];
    playerLegs?: [];
}