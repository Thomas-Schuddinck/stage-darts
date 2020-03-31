import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';


const useStyles = makeStyles(theme => ({
    leg: {
        fontSize: '1.3em',
        color: indigo[700],
        [theme.breakpoints.up('sm')]: {
            fontSize: '2em',
          },
          textAlign: 'center',
    },
}));

const Legs = (props: any) => {
    const classes = useStyles();
    return (
            <Typography className={classes.leg}>legs: {props.legs}</Typography>
    );

};


export default Legs;