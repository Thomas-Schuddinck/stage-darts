import { makeStyles } from '@material-ui/core/styles';
import React from 'react';


const useStyles = makeStyles(theme => ({
    tekstHoofd: {
        alignSelf: 'center',
        color: "#004BFF",
        fontSize: '2em',
        borderBottomColor: '#004BFF',
        borderBottomWidth: 3,
        borderBottomStyle: "solid"

    },

}));

function Person(props: any) {
    const classes = useStyles();

    return (
        <div>
            <span className={classes.tekstHoofd}>{props.name}</span>
            </div>
    );

};


export default Person;