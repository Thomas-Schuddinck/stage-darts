import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import { makeStyles } from '@material-ui/core/styles';

const winner = "First to 501"
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
export const ShortInfoWinner = () =>  {
    const classes = useStyles();


    return (
        
        <Paper className={classes.paper} elevation={3}>
            <EmojiEventsIcon className={classes.icoon}/>
            <span className={classes.tekst}>{winner}</span>
        </Paper>
    );

};
