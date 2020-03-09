import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PlayArrow from '@material-ui/icons/PlayArrow';
import { indigo } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    tekstHoofd: {
        fontSize: '1.5em',
        alignSelf: 'center',
        color: indigo[700],
        // borderBottomColor: indigo[700],
        // borderBottomWidth: 3,
        // borderBottomStyle: "solid",

        [theme.breakpoints.up('sm')]: {
            fontSize: '2.5em',
          },

    },

}));

function Person(props: any) {
    const classes = useStyles();

    return (
        <div>
            <span className={classes.tekstHoofd}>
                {props.name}
            </span>
        </div>
    );

};


export default Person;