import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import React from 'react';

const numDarts = "3 darts per turn"

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
        background: 'linear-gradient(60deg,#10acf1, #1092f1)'
    },
    icoon: {
        color: "white",
        fontSize: '2.5em'
    },
    tekst: {
        textAlign: 'right',
        color: "white",
        fontSize: '1.5em',
        margin: '0 auto'
    }
}));

export const ShortInfoDarts = () =>  {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} elevation={3}>
            <GpsFixedIcon className={classes.icoon}/>
            <span className={classes.tekst}>{numDarts}</span>
        </Paper>
    );
};