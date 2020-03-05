import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PlayArrow from '@material-ui/icons/PlayArrow';
import { indigo } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    tekstHoofd: {
        alignSelf: 'center',
        color: indigo[700],
        fontSize: '2em',
        borderBottomColor: indigo[700],
        borderBottomWidth: 3,
        borderBottomStyle: "solid"
    },

}));

function Person(props: any) {
    const classes = useStyles();

    return (
        <div>
            <span className={classes.tekstHoofd}>
                <PlayArrow/>
                {props.name}
            </span>
        </div>
    );

};


export default Person;