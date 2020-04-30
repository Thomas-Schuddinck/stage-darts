import React, { useState, useEffect } from 'react';
import { Game } from '../../../models/Game';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Wrap from '../../../hoc/Wrap';
import CardBody from "../../../styledcomponents/CardBody";
import Card from "../../../styledcomponents/Card";
import PregnantWomanIcon from '@material-ui/icons/PregnantWoman';
import { Typography } from '@material-ui/core';

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
    float: {
        textAlign: 'right',
    },
    padding: {
        padding: '1em',
    },
    center: {
        textAlign: 'center',
    }
}));



const TournamentGame = (props: any) => {

    const classes = useStyles();
    let history = useHistory();

    const playTourneyGame = (game: Game) => {
        console.log("bracket: " + game.bracketSectorNumber);
        console.log("stage: " + game.bracketStageNumber);
        console.log(game);
        history.push(`/game/${game.id}`);
    }
    const createName = () => {
        let name: JSX.Element[] = [];
        console.log(props.propsgame.players[0]);
        let stringname = props.propsgame.players[0].playerDTO.name + " vs " + props.propsgame.players[1].playerDTO.name;
        name.push(
            <Wrap>
                <Typography>Wouter</Typography>
                <Typography className={classes.float}> <PregnantWomanIcon/> vs</Typography>
                <Typography>Thomas</Typography>
            </Wrap>
        );

        return name;

    }
    return (
        <Wrap>
            <Card className={classes.cardje} >
                <div onClick={() => playTourneyGame(props.propsgame)}>
                    <CardBody className={classes.padding}>{props.propsgame.canStart ?
                        (
                            createName()
                        ) : (
                            <Typography className={classes.center}>To be determined</Typography>
                        )
                    }</CardBody>
                </div>
            </Card>
        </Wrap>
    );

}

export default TournamentGame;