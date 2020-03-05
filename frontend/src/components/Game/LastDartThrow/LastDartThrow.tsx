import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Wrap from '../../../hoc/Wrap'
import { TextField, ListItem, Typography } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    roos: {
        color: "red",
        fontSize: '1.5em',
    },
    listItemText: {
        color: "red",
        fontSize: '2em',
        display: 'flex',
        margin: "0 auto"
    },
    mainDiv: {
        display: 'flex',
        flexDirection: 'row',
    },
    input: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: '1.7em',
        padding: '0.5em',
    },
    listitem: {
    }
}));

function LastDartThrow(props: any) {

    const classes = useStyles();


    return (
        <Wrap>
            <div className={classes.mainDiv}>
                <Typography className={classes.listItemText}>{props.score}</Typography>
            </div>
        </Wrap>
    );


};

export default LastDartThrow;


