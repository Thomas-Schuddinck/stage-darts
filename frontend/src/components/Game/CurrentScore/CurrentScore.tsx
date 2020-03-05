import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
    score: {
        color: indigo[700],
        fontSize: '4em',
        
    },

}));

const CurrentScore = (props: any) => {
    const classes = useStyles();
    return (
            <Typography className={classes.score}>{props.score}</Typography>
    );

};


export default CurrentScore;