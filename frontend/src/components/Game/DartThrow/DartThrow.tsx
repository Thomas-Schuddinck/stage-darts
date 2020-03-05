import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ListItem, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    roos: {
        color: "red",
        fontSize: '0.8em',
    },
    listItemText: {
        color: "red",
        fontSize: '1.5em',
    },
    input: {
        color: "red",
        textAlign: 'center',
        padding: '0.5em',
    },
    noPadding: {
        padding: '0.2em',
    }
}));

function DartThrow(props: any) {
    const classes = useStyles();

    return (
        <ListItem className={classes.noPadding}>
            <TextField className={classes.listItemText} id="outlined-basic" variant="outlined" defaultValue={props.score} inputProps={{className: classes.input}}/>
        </ListItem>
    );


};

export default DartThrow;