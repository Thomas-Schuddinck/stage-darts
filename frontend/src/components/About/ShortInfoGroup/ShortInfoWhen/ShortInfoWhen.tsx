import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import React from 'react';

const only = "ONLY DURING BREAKS"

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
        backgroundColor: 'red',
        justifyContent: 'space-between',
    },
    icoon: {
        color: "white",
        fontSize: '2.5em'
    },
    tekst: {
        color: "white",
        fontSize: '1.2em',
        margin: 'auto 0'
    }
}));

export const ShortInfoWhen = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} elevation={3}>
            <FreeBreakfastIcon className={classes.icoon} />
            <span className={classes.tekst}>{only}</span>
        </Paper>
    );
};

