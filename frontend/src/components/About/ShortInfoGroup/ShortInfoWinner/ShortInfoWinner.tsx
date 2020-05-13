import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import React from 'react';

const winner = "First to 501"

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

export const ShortInfoWinner = () =>  {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} elevation={3}>
            <EmojiEventsIcon className={classes.icoon}/>
            <span className={classes.tekst}>{winner}</span>
        </Paper>
    );
};
