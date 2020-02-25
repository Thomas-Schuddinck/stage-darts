import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TimerIcon from '@material-ui/icons/Timer';
import { makeStyles } from '@material-ui/core/styles';

const duration = "5-20 minutes"
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
        backgroundColor: '#4CBCFF'
        
    },
    
    icoon: {
        color: "#004BFF",
        fontSize: '2.5em'
        
    },
    tekst: {
        alignSelf: 'center',
        color: "#004BFF",
        fontSize: '1.5em',
        margin: '0 auto'
        
    },
    
}));
export const ShortInfoDuration = () =>  {
    const classes = useStyles();


    return (
        
        <Paper className={classes.paper} elevation={3}>
            <TimerIcon className={classes.icoon}/>
            <span className={classes.tekst}>{duration}</span>
        </Paper>
    );

};
