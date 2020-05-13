import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ListItem, Button } from '@material-ui/core';
import './DartThrow.css'
import indigo from '@material-ui/core/colors/indigo';

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
        color: '#FFFFFF',
    }
}));

function DartThrowComponent(props: any) {
    const classes = useStyles();

    return (
        <ListItem className={classes.noPadding}>
                <Button>
                    {props.score.value}
                </Button>
        </ListItem>
    );
};

export default DartThrowComponent;