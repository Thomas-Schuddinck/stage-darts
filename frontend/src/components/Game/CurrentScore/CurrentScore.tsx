import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
    score: {
        color: indigo[700],
        fontSize: '10em',
    },

}));

const CurrentScore = (props: any) => {
    const classes = useStyles();



    return (
        <div>
            <Typography className={classes.score}>{props.score}</Typography>
        </div>
    );

};


export default CurrentScore;