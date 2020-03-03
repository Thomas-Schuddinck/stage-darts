import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import React from 'react';


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
    hoofd: {
        alignSelf: 'center',
      color: "#004BFF",
      fontSize: '2em',
      paddingLeft: '0.7em',
      paddingRight: '0.7em',
      borderBottomColor: '#004BFF',
      borderBottomWidth: 3,
      borderBottomStyle: "solid"
    },
    
}));

function LastDartThrow(props: any) {
    
    const classes = useStyles();


    return (
        
        <Paper className={classes.paper}>
            <span className={classes.hoofd}>Last Throw</span>
            <ListItem button>
            <ListItemIcon>
                <GpsFixedIcon className={classes.roos}/>
            </ListItemIcon>
            <ListItemText classes={{primary:classes.listItemText}} primary={props.score} />
        </ListItem>
        </Paper>
    );


};

export default LastDartThrow;


