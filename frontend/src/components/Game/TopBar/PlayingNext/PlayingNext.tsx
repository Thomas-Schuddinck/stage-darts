import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
        backgroundColor: '#00FF9B'
        
    },
    
    icoon: {
        color: "#004BFF",
        fontSize: '2.5em',
        marginRight: '1.5em'
        
    },
    tekst: {
        alignSelf: 'center',
        color: "#004BFF",
        fontSize: '1.5em',
        
    },
    
}));
function PlayingNext(props: any) {
    const classes = useStyles();


    return (
        
        <Paper className={classes.paper} elevation={3}>
            <NavigateNextIcon  className={classes.icoon}/>
            <span className={classes.tekst}>Playing next: {props.name}</span>
        </Paper>
    );

};

export default PlayingNext;