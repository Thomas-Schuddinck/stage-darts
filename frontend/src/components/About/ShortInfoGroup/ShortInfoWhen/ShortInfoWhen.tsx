import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import { makeStyles } from '@material-ui/core/styles';

const only = "ONLY DURING BREAKS"
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
        backgroundColor: 'red'
        
    },
    
    icoon: {
        color: "white",
        fontSize: '2.5em'
        
    },
    tekst: {
        alignSelf: 'center',
        color: "white",
        
        fontSize: '1.2em',
        margin: '0 auto'
        
        
    },
    
}));
export const ShortInfoWhen = () =>  {
    const classes = useStyles();


    return (
        
        <Paper className={classes.paper} elevation={3}>
            <FreeBreakfastIcon className={classes.icoon}/>
            <span className={classes.tekst}>{only}</span>
        </Paper>
    );

};




