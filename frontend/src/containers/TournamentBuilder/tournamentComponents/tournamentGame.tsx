import React, { useState, useEffect } from 'react';
import { Game } from '../../../models/Game';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Wrap from '../../../hoc/Wrap';
import CardBody from "../../../styledcomponents/CardBody";
import Card from "../../../styledcomponents/Card";
import PregnantWomanIcon from '@material-ui/icons/PregnantWoman';
import { Typography } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    cardje: {
        padding: "0",
        margin: "0",
    },
    float: {
        textAlign: 'right',
    },
    padding: {
        padding: '1em',
    },
    tbd: {
        textAlign: 'center',
    },
    hover: {
        height: '100%',
        width: '100%',

        "&:hover": {
            cursor: "pointer",
            color: 'white',
        }
    }
}));



const TournamentGame = (props: any) => {

    const classes = useStyles();
    let history = useHistory();

    const playTourneyGame = (game: Game) => {
        history.push(`/game/${game.id}`);
    }
    const createName = () => {
        let name: JSX.Element[] = [];
        name.push(
            <div className={classes.hover}>
                <Typography>{props.propsgame.players[0].playerDTO.name}</Typography>
                <Typography className={classes.float}> <PregnantWomanIcon/> vs</Typography>
                <Typography>{props.propsgame.players[1].playerDTO.name}</Typography>
            </div>
        );

        return name;

    }
    return (
        <Wrap>
            <Card className={classes.cardje} >
                <div onClick={() => playTourneyGame(props.propsgame)}>
                    <CardBody className={classes.padding}>{props.propsgame.status == 2 ?
                        (
                            createName()
                        ) : (
                            <Typography className={classes.tbd}>To be determined</Typography>
                        )
                    }</CardBody>
                </div>
            </Card>
            {/* <Alert severity="error">This is an error message!</Alert> */}
        </Wrap>
    );

}

export default TournamentGame;