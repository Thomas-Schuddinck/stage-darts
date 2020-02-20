import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    roos: {
        color: "red",
        fontSize: '4em',
        marginRight: '0.3em'
    },
    listItemText: {
        color: "red",
        fontSize: '3.8em'
    },
    
}));

function LastDartThrow(props: any) {
    
    const classes = useStyles();


    return (
        
        <Paper className={classes.paper}>
            <h1>Last Throw</h1>
            <ListItem button>
            <ListItemIcon>
                <GpsFixedIcon  className={classes.roos}/>
            </ListItemIcon>
            <ListItemText  classes={{primary:classes.listItemText}} primary={props.score} />
        </ListItem>
        </Paper>
    );


};

export default LastDartThrow;


