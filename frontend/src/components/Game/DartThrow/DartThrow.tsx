import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(theme => ({
    roos: {
        color: "red",
        fontSize: '0.8em',
    },
    listItemText: {
        color: "red",
        fontSize: '1.5em',
    },
}));

function DartThrow(props: any) {
    const classes = useStyles();

    return (
            <ListItemText classes={{ primary: classes.listItemText }}>
                {props.score}
            </ListItemText>
    );


};

export default DartThrow;