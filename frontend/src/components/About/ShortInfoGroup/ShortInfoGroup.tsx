import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ShortInfoCompetition } from './ShortInfoCompetition/ShortInfoCompetition';
import { ShortInfoDarts } from './ShortInfoDarts/ShortInfoDarts';
import { ShortInfoDuration } from './ShortInfoDuration/ShortInfoDuration';
import { ShortInfoGambling } from './ShortInfoGambling/ShortInfoGambling';
import { ShortInfoPlayers } from './ShortInfoPlayers/ShortInfoPlayers';
import { ShortInfoStats } from './ShortInfoStats/ShortInfoStats';
import { ShortInfoWhen } from './ShortInfoWhen/ShortInfoWhen';
import { ShortInfoWinner } from './ShortInfoWinner/ShortInfoWinner';
import { ShortInfoTournament } from './ShortInfoTournaments/ShortInfoCompetition';

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
                <Grid item xs={12}>
                    <ShortInfoTournament/>
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
