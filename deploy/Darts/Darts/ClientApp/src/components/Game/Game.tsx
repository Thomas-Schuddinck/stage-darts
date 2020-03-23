import React from 'react';
import DartThrow from './DartThrow/DartThrow';
import GamePlayer from './GamePlayer/GamePlayer';


const game = () => {
    return (
        <div>
            <GamePlayer></GamePlayer>
            <DartThrow></DartThrow>
        </div>
    );
};

export default game;