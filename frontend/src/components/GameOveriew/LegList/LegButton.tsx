import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { ListItem } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';

const tekst = "Leg "
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
        backgroundColor: '#4CBCFF'

    },
    tekst: {
        alignSelf: 'center',
        color: "#004BFF",
        fontSize: '1.1em',
        margin: '0 auto'


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
    colR: {
        color: 'red'
    },
    colI: {
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
        color: '#FFFFFF',
    }

}));
export const LegButtonComponent = (props: any) => {
    const classes = useStyles();
    
    let [selected = false, setSelected] = useState<boolean>();
    const toggleSelected = () => {
        if(props.current !== props.id) {
            setSelected(false);
        }
        else {
            setSelected(true);
            props.sendIdToParent(props.id);
        }
            
        console.log("de knop id die geselecteerd is: " + props.id);
        
    }

    return (


        <ListItem onClick={() => toggleSelected()} className={selected ? classes.buttonselected : classes.buttonstyle}>
            <Paper className={classes.paper} elevation={3}>
                <span className={classes.tekst}>{tekst}{props.legnr}</span>
            </Paper>

        </ListItem>
    );

};




