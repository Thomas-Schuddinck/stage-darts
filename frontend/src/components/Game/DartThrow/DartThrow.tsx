import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import React from 'react';

const useStyles = makeStyles(theme => ({
    roos: {
        color: "red",
        fontSize: '1em',
        marginLeft: '0.5em'
    },
    listItemText: {
        color: "red",
        fontSize: '2em',
    },
    marge: {
        marginBottom: '0',
    }
    
}));

function DartThrow(props: any) {
    const classes = useStyles();

    return (
        <ListItem className={classes.marge} button>
            <ListItemIcon>
                {props.hitIcon?(<GpsFixedIcon className={classes.roos}/>): (<p></p>)}
            </ListItemIcon>
            <ListItemText classes={{primary:classes.listItemText}} primary={props.score} />
            <ListItemIcon>
                {props.hitIcon?(<GpsFixedIcon className={classes.roos}/>): (<p></p>)}
            </ListItemIcon>
        </ListItem>
    );


};

export default DartThrow;