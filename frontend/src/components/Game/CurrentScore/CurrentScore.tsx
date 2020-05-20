import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    score: {
        fontSize: '2.5em',
        color: indigo[700],
        [theme.breakpoints.up('sm')]: {
            fontSize: '4em',
          },
        textAlign: 'center'
    }
}));

const CurrentScore = (props: any) => {
    const classes = useStyles();

    return (
            <Typography className={classes.score}>{props.score}</Typography>
    );
};

export default CurrentScore;