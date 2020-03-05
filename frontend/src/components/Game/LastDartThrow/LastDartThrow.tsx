import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import React from 'react';
import Wrap from '../../../hoc/Wrap'
import { TextField, ListItem } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    roos: {
        color: "red",
        fontSize: '1.5em',
    },
    listItemText: {
        color: "red",
        fontSize: '2em'
    },
    mainDiv: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
    },
    input: {
        color: 'red',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '1.7em',
        padding: '0.5em',
    }
}));

function LastDartThrow(props: any) {

    const classes = useStyles();


    return (
        <Wrap>
            <div className={classes.mainDiv}>
                
            {/* <ListItemText classes={{ primary: classes.listItemText }} primary={props.score} /> */}
            <ListItem>
                <TextField className={classes.listItemText}
                id="outlined-basic" 
                variant="outlined" 
                value={props.score} 
                inputProps={{className: classes.input}}
                />
            </ListItem>
            
            </div>
        </Wrap>
    );


};

export default LastDartThrow;


