import React from 'react';

export interface Stats {
    numberOfWins?: number;
    numberOfMisses?: number;
    numberOfSixties?: number;
    totalScoreThrown?: number;
    totalNumberDartsThrown?: number;
    percentageSixties?: number;
    averageScoreThrown?: number;
    percentageWins?: number;
    percentageBoardHits?: number;
}