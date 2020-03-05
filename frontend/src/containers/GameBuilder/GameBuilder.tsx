import React, { useState, useEffect } from 'react';
import Person from '../../components/Game/Person'
import Aux from '../../hoc/Wrap';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import PropagateLoader from "react-spinners/PropagateLoader";
import GetApiCall from '../../services/ApiClient';
import LastDartThrow from '../../components/Game/LastDartThrow/LastDartThrow';
import PlayingNext from '../../components/Game/TopBar/PlayingNext/PlayingNext';
import CurrentLeader from '../../components/Game/TopBar/CurrentLeader/CurrentLeader';
import CurrentTurn from '../../components/Game/CurrentTurn/CurrentTurn';
import CurrentPlayer from '../../components/Game/TopBar/CurrentPlayer/CurrentPlayer';
import { Game } from '../../models/Game';
import { css } from "@emotion/core";
import { Player } from '../../models/Player';
import TakePhoto from '../../components/Game/TakePhoto/TakePhoto';
import CurrentScore from '../../components/Game/CurrentScore/CurrentScore';
import { PlayerLeg } from '../../models/PlayerLeg';


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },

    alignFlex: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    alignFlexChildren: {
        margin: 'auto'
    },
    centerContent: {
        alignItems: "center",
    },
    currentTurn: {
        overflow: 'auto',
    }
}));



export default function GameBuilder() {

    const classes = useStyles();
    let [game, setGame] = useState();
    let [isLoading, setLoading] = React.useState(true);
    const FetchData = async () => {

        setLoading(true);

        setGame(await CallToApiGame());

        setLoading(false);

    }

    useEffect(() => {
        FetchData();
    }, []);

    const CallToApiGame = async (): Promise<Game> => {
        return await GetApiCall('http://localhost:5000/Game/2').then(game => {
            return game;
        });
    }

    const fixedHeightPaper = clsx(classes.paper, classes.centerContent);
    const scores = [1, 5, 40];

    const spinner = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    margin-left: 50%;
  `;

    return (
        <Aux>
            {isLoading ? (
                <PropagateLoader
                    css={spinner}
                    size={20}
                    color={"#123abc"}
                />
            ) : (
                    <Aux>
                        <Grid container spacing={3}>

                            {game.legGroups![game.legGroups.length - 1].playerLegs.map(function (pl: PlayerLeg, i: any) {
                                return <Grid item xs={12} md={6} lg={6}>
                                    <Paper className={fixedHeightPaper}>
                                        <Grid container>
                                            <Grid item xs={5} md={4} lg={4}>
                                                <Person name={pl.player!.name} />
                                                <CurrentScore score={pl.currentScore} /> {/*dto laten meegeven wat zijn huidige score is?*/}
                                            </Grid>
                                            <Grid item xs={7} md={8} lg={8}>
                                                <Paper>
                                                    <LastDartThrow score={pl.turns![pl.turns!.length - 1].throws!.map(t => t.value!).reduce((a, b) => a + b, 0)} />
                                                    <CurrentTurn className={classes.currentTurn} turnnumber="2" scores={pl.turns![pl.turns!.length - 1].throws!.map(t => t.value)} />
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            }
                            )}


                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={6}>
                                <Paper>
                                    <TakePhoto />
                                </Paper>
                            </Grid>
                        </Grid>
                    </Aux>
                )}
        </Aux>
    );
}