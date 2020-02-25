import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { makeStyles } from '@material-ui/core/styles';

const ng = "NO GAMBLING ALLOWED"
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
export const ShortInfoGambling= () =>  {
    const classes = useStyles();


    return (
        
        <Paper className={classes.paper} elevation={3}>
            <MonetizationOnIcon className={classes.icoon}/>
            <span className={classes.tekst}>{ng}</span>
        </Paper>
    );

};




