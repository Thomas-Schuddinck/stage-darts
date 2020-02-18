import React from 'react';

import GamePlayer from './GamePlayer/GamePlayer';
import DartThrow from './DartThrow/DartThrow';

const game = () => {
    return (
        <div>
            <GamePlayer></GamePlayer>
            <DartThrow></DartThrow>
        </div>
    );
};

export default game;