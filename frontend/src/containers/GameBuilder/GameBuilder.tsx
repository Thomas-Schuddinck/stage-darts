import React, { Component } from 'react';
import Person from '../../components/PersonalStats/Person'
import Aux from '../../hoc/Wrap';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import DartThrow from '../../components/Game/DartThrow/DartThrow';
import LastDartThrow from '../../components/Game/LastDartThrow/LastDartThrow';
import PlayingNext from '../../components/Game/TopBar/PlayingNext/PlayingNext';
import CurrentLeader from '../../components/Game/TopBar/CurrentLeader/CurrentLeader';

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


    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    return (
        <Aux>
            <Grid container spacing={3}>
                {/* Chart */}
                
                <Grid item md={4} lg={4}>
                </Grid>
                    
                <Grid item xs={12} md={4} lg={4} >
                    <PlayingNext name="Wouter"/>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <CurrentLeader name="Thomas"/>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Paper className={fixedHeightPaper}>
                        <Person />
                    </Paper>
                </Grid>
                {/* Recent Deposits */}
                <Grid item xs={12} md={6} lg={6}>
                    <Paper className={fixedHeightPaper}>
                        <Person />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    
                        <LastDartThrow score="151"/>
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                    <Paper className={classes.paper}>
                        
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