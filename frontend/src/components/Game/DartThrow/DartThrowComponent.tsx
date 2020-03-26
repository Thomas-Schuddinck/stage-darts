import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { ListItem, TextField, Button } from '@material-ui/core';
import './DartThrow.css'
import indigo from '@material-ui/core/colors/indigo';
import clsx from 'clsx';
import { DartThrow } from '../../../models/DartThrow';

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
        padding: '0',
        justifyContent: 'inherit'
    },
    colR:{
        color: 'red'
    },
    colI:{
        color: indigo[400],
    },
    buttonstyle: {
        padding: '0',
        minWidth: '30px'
    },
    buttonselected: {
        padding: '0',
        minWidth: '30px',
        backgroundColor: indigo[600],
        color: 'white',
    }
}));

function DartThrowComponent(props: any) {
    const classes = useStyles();
    let [eroor, setEroor] = useState<boolean>();
    let [scorevalue, setScorevalue] = useState<number>();
    let [selected = false, setSelected] = useState<boolean>();

    useEffect(() => {
        console.log("usefefect gebruiket");
        setScorevalue(props.score);
    }, []);

    const rightinput = ((inv: number) => {
        if(inv <= 60 &&  inv >= 0 && (inv <= 20 || (inv %2 === 0 && inv < 40)|| inv % 3 === 0 || inv === 25 || inv === 50))
            setEroor(false);
        else {
            setEroor(true);
            throwcolor = '#5c6bc0';
        }
        setScorevalue(inv);
        console.log(eroor);
    });

    const toggleSelected = (tr: DartThrow) => {
        if(selected) {
            setSelected(false);
            props.sendThrowToParent(null);
        }
        else {
            setSelected(true);
            props.sendThrowToParent(tr);
        }
            

        
    }
    return (
        <ListItem className={classes.noPadding}>
            {/* <TextField type='number' InputProps={{ inputProps: { min: 0, max: 60, className:clsx( classes.input, classes.listItemText , eroor && classes.colR, !eroor && classes.colI )  } }}
                onChange={event => rightinput(Number.parseInt(event.target.value))}
                error={eroor}
                id="outlined-basic" variant="outlined" value={scorevalue} /> */}
                <Button onClick={() => toggleSelected(props.score)} className={selected ? classes.buttonselected: classes.buttonstyle}>
                    {props.score.value}
                </Button>
        </ListItem>
    );


};

export default DartThrowComponent;