import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import BarChartIcon from '@material-ui/icons/BarChart';
import React from 'react';

const stats = "Personal stats"

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

export const ShortInfoStats = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} elevation={3}>
            <BarChartIcon className={classes.icoon} />
            <span className={classes.tekst}>{stats}</span>
        </Paper>
    );
};