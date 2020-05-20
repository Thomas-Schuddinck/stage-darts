import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';
import React from 'react';

const players = "min. 2 players"

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
        background: 'linear-gradient(60deg,#10acf1, #1092f1)',        
        justifyContent: 'space-between',
    },
    icoon: {
        color: "white",
        fontSize: '2.5em'
    },
    tekst: {
        textAlign: 'right',
        color: "white",
        fontSize: '1.5em',
        margin: 'auto 0'
    },
}));

export const ShortInfoPlayers = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} elevation={3}>
            <GroupIcon className={classes.icoon} />
            <span className={classes.tekst}>{players}</span>
        </Paper>
    );
};