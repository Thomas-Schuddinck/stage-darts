import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';
import React from 'react';

const players = "min. 2"
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
        backgroundColor: '#4CBCFF'
        
    },
    
    icoon: {
        color: "#004BFF",
        fontSize: '2.5em'
        
    },
    tekst: {
        alignSelf: 'center',
        color: "#004BFF",
        fontSize: '1.5em',
        margin: '0 auto'
        
        
    },
    
}));
export const ShortInfoPlayers = () =>  {
    const classes = useStyles();


    return (
        
        <Paper className={classes.paper} elevation={3}>
            <GroupIcon className={classes.icoon}/>
            <span className={classes.tekst}>{players}</span>
        </Paper>
    );

};




