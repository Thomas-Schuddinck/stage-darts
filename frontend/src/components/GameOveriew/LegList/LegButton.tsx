import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { ListItem, Button } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';

const tekst = "Leg "
const useStyles = makeStyles(theme => ({
    paper: {
        

    },
    tekst: {
        alignSelf: 'center',
        color: "#004BFF",
        fontSize: '1.8em',
        margin: '0 auto'


    },
    listItemText: {
        color: "red",
    },
   
    buttonstyle: {
        minWidth: '30px',
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
        justifySelf: 'start',
        background: 'linear-gradient(60deg, #26c6da, #00acc1)',
        '& > *':{
            color: 'white',
        }
    },
    buttonselected: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
        background: 'linear-gradient(60deg,#10acf1, #1092f1)',
        minWidth: '30px',
        '& > *':{
            color: 'white',
        }
    }, 
    wd: {
        width: '150px',
    },

}));
export const LegButtonComponent = (props: any) => {
    const classes = useStyles();
    const toggleSelected = () => {
        props.sendIdToParent(props.id);
    }

    return (


        <ListItem   className={classes.wd}>
            <Paper className={props.current === props.id? classes.buttonselected : classes.buttonstyle} elevation={3}>
                <Button  onClick={() => toggleSelected()}>{tekst}{props.legnr}</Button>
            </Paper>

        </ListItem>
    );

};




