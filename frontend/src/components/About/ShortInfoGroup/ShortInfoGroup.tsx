import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ShortInfoPlayers } from './ShortInfoPlayers/ShortInfoPlayers';
import { ShortInfoDuration } from './ShortInfoDuration/ShortInfoDuration';
import { ShortInfoWinner } from './ShortInfoWinner/ShortInfoWinner';
import { ShortInfoCompetition } from './ShortInfoCompetition/ShortInfoCompetition';
import { ShortInfoGambling  } from './ShortInfoGambling/ShortInfoGambling';
import { ShortInfoDarts  } from './ShortInfoDarts/ShortInfoDarts';
import Grid from '@material-ui/core/Grid';
import { ShortInfoWhen } from './ShortInfoWhen/ShortInfoWhen';
import { ShortInfoStats } from './ShortInfoStats/ShortInfoStats';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    hr:{
        margin: '2em 0'
    }

}));
export const ShortInfoGroup = () => {


    const classes = useStyles();
    return (
        <div>
            <Grid container spacing={3}>

                <Grid item xs={12} >
                    <ShortInfoPlayers />
                </Grid>
                <Grid item xs={12}>
                    <ShortInfoDuration />
                </Grid>
                <Grid item xs={12}>
                    <ShortInfoWinner />
                </Grid>
                <Grid item xs={12}>
                    <ShortInfoStats />
                </Grid>
                
                <Grid item xs={12}>
                    <ShortInfoDarts />
                </Grid>
            </Grid>
            <hr className={classes.hr}/>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ShortInfoWhen />
                </Grid>
                <Grid item xs={12} >
                    <ShortInfoGambling />
                </Grid>
            </Grid>
            <hr className={classes.hr}/>
            <Grid container spacing={3}>

                <Grid item xs={12} >
                    <ShortInfoCompetition />
                </Grid>
            </Grid>

        </div>





    )
}
