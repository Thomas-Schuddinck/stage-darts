import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { ListItem, TextField } from '@material-ui/core';
import './DartThrow.css'
import indigo from '@material-ui/core/colors/indigo';
import clsx from 'clsx';
let throwcolor = indigo[400];

const useStyles = makeStyles(theme => ({
    roos: {
        color: throwcolor,
        fontSize: '0.8em',
    },
    listItemText: {
        color: "red",
    },
    input: {
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
    colR:{
        color: 'red'
    },
    colI:{
        color: indigo[400],
    }
}));

function DartThrow(props: any) {
    const classes = useStyles();
    let [eroor, setEroor] = useState<boolean>();
    let [scorevalue, setScorevalue] = useState<number>();
    useEffect(() => {
        console.log("usefefect gebruiket");
        setScorevalue(props.score);
    }, []);

    const rightinput = ((inv: number) => {
        if(inv <= 60 &&  inv >= 0 && (inv <= 20 || (inv %2 === 0 && inv < 40)|| inv % 3 === 0 || inv === 25 || inv === 50))
            setEroor(false);
        else {
            setEroor(true);
            throwcolor = 'red';
        }
        setScorevalue(inv);
        console.log(eroor);
    });

    return (
        <ListItem className={classes.noPadding}>
            <TextField type='number' InputProps={{ inputProps: { min: 0, max: 60, className:clsx( classes.input, classes.listItemText , eroor && classes.colR, !eroor && classes.colI )  } }}
                onChange={event => rightinput(Number.parseInt(event.target.value))}
                error={eroor}
                id="outlined-basic" variant="outlined" value={scorevalue} />
        </ListItem>
    );


};

export default DartThrow;