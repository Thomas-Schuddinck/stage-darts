import React from 'react';
import { DartThrow } from './DartThrow';

export interface Turn {
    id: number;
    turnNr?: number;
    throws?: DartThrow[];
}