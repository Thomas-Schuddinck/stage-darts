import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PlayArrow from '@material-ui/icons/PlayArrow';
import { indigo } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    tekstHoofd: {
        fontSize: '1.5em',
        alignSelf: 'center',
        color: indigo[700],

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
                {props.player.id === props.currentplayer.id ? (<PlayArrow/>): (null)}
                
                {props.player.name}
            </span>
        </div>
    );

};


export default Person;