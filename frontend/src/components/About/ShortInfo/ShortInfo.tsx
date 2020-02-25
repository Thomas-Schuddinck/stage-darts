import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import GroupIcon from '@material-ui/icons/Group';
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },

}));
const DartsExplained = () => {


    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <p>history?</p>
            <p>heatmap?</p>
        </Paper>
    )
}

export default DartsExplained;