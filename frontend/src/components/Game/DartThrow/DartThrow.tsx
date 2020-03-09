import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { ListItem, TextField } from '@material-ui/core';
import './DartThrow.css'
import { EPROTONOSUPPORT } from 'constants';
const useStyles = makeStyles(theme => ({
    roos: {
        color: "red",
        fontSize: '0.8em',
    },
    listItemText: {
        color: "red",
    },
    input: {
        color: "red",
        textAlign: 'center',
        padding: '0.5em',
        fontSize: '0.8em',
        [theme.breakpoints.up('sm')]: {
            fontSize: '1.2em',
          },
    },
    noPadding: {
        padding: '0.2em',
        justifyContent: 'inherit'
    },
}));

function DartThrow(props: any) {
    const classes = useStyles();
    let [eroor, setEroor] = useState();
    const rightinput = ((inv: number) => {
        if(inv < 60 &&  inv >= 0 && (inv %2 === 0 || inv % 3 === 0 || inv === 25))
            setEroor(true);
        else
            setEroor(false);
    })

    return (
        <ListItem className={classes.noPadding}>
            <TextField type='number' InputProps={{ inputProps: { min: 0, max: 60, className: classes.input } }}
                onChange={event => rightinput(Number.parseInt(event.target.value))}
                error={eroor}
                className={classes.listItemText} id="outlined-basic" variant="outlined" defaultValue={props.score} />
        </ListItem>
    );


};

export default DartThrow;