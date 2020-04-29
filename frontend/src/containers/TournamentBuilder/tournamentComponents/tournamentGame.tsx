import React, { useState, useEffect } from 'react';
import { Game } from '../../../models/Game';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Wrap from '../../../hoc/Wrap';
import CardBody from "../../../styledcomponents/CardBody";
import Card from "../../../styledcomponents/Card";

const useStyles = makeStyles(theme => ({
    cardje: {
        padding: "0",
        margin: "0",
        "&:hover": {
            cursor: "pointer",
            backgroundColor: 'black',
            color: 'white',
        }
    },
}));



const TournamentGame = (props: any) => {

    const classes = useStyles();
    let history = useHistory();

    const playTourneyGame = (game: Game) => {
        console.log("bracket: " + game.bracketSectorNumber);
        console.log("stage: " + game.bracketStageNumber);
        console.log(game);
        //history.push(`/game/${game.id}`);
    }
    return (
        <Wrap>
            <Card className={classes.cardje} >
                <div onClick={() => playTourneyGame(props.propsgame)}>
                    
                    <CardBody>{props.propsgame.canStart ? "start" : "to be determined"}</CardBody>
                </div>
            </Card>
        </Wrap>
    );

}

export default TournamentGame;