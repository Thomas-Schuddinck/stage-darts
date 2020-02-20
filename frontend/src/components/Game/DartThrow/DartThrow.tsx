import React, { Component } from 'react';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    roos: {
        color: "red",
        fontSize: '2em',
        marginRight: '0.3em'
    },
    listItemText: {
        color: "red",
        fontSize: '3.8em'
    },
    
}));

function DartThrow(props: any) {
    const classes = useStyles();

    return (
        <ListItem button>
            <ListItemIcon>
                <GpsFixedIcon className={classes.roos}/>
            </ListItemIcon>
            <ListItemText classes={{primary:classes.listItemText}} primary={props.score} />
        </ListItem>
    );


};

export default DartThrow;