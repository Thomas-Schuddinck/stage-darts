import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Wrap from '../../../hoc/Wrap'
import { Typography } from '@material-ui/core';
import indigo from '@material-ui/core/colors/indigo';

const useStyles = makeStyles(theme => ({
    roos: {
        fontSize: '1.5em',
    },
    listItemText: {
        color: indigo[700],
        fontSize: '1.5em',
        [theme.breakpoints.up('sm')]: {
            fontSize: '2em',
          },
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


