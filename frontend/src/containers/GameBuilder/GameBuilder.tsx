import React, { useState, useEffect } from 'react';
import Person from '../../components/Game/Person'
import Aux from '../../hoc/Wrap';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import GetApiCall from '../../services/ApiClient';
import LastDartThrow from '../../components/Game/LastDartThrow/LastDartThrow';
import PlayingNext from '../../components/Game/TopBar/PlayingNext/PlayingNext';
import CurrentLeader from '../../components/Game/TopBar/CurrentLeader/CurrentLeader';
import CurrentTurn from '../../components/Game/CurrentTurn/CurrentTurn';
import CurrentPlayer from '../../components/Game/TopBar/CurrentPlayer/CurrentPlayer';
import { Game } from '../../models/Game';

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
    console.log(game)
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const scores = [1, 5, 40];

    return (
        <Aux>
            <Grid container spacing={3}>
                {/* Chart */}

                <Grid item xs={12} md={4} lg={4} >
                    <CurrentPlayer name="Thomas" />
                </Grid>

                <Grid item xs={12} md={4} lg={4}>
                    <CurrentLeader name="Thomas" />
                </Grid>

                <Grid item xs={12} md={4} lg={4} >
                    <PlayingNext name="Wouter" />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Paper className={fixedHeightPaper}>
                        <Person name="Thomas" />
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={6} lg={6}>
                    <Paper className={fixedHeightPaper}>
                        <Person name="Wouter" />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>

                    <LastDartThrow score="40" />
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                    <Paper className={classes.paper}>
                        <CurrentTurn turnnumber="2" scores={scores} />
                    </Paper>
                </Grid>
                {/* Recent Orders */}
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <p>history?</p>
                        <p>heatmap?</p>
                    </Paper>
                </Grid>
            </Grid>
        </Aux>
    );
}