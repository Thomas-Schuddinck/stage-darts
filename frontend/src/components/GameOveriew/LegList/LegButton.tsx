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
        backgroundColor: '#4CBCFF'
    },
    buttonselected: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
        backgroundColor: 'green',
        minWidth: '30px',
        color: '#FFFFFF',
    }

}));
export const LegButtonComponent = (props: any) => {
    const classes = useStyles();
    
    let [selected, setSelected] = useState<boolean>(props.current === props.id);
    const toggleSelected = async() => {
        console.log("current voor is: " + props.current);
        await props.sendIdToParent(props.id);
        
        console.log("current na is: " + props.current);
        if(props.current !== props.id) {
            setSelected(false);
        }
        else {
            setSelected(true);
            
        }
        
        console.log("de knop id die geselecteerd is: " + props.id);
        console.log("current na na is: " + props.current);
            
        
    }

    return (


        <ListItem  >
            <Paper className={selected ? classes.buttonselected : classes.buttonstyle} elevation={3}>
                <Button  onClick={() => toggleSelected()}>{tekst}{props.legnr}</Button>
            </Paper>

        </ListItem>
    );

};




