import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import GroupIcon from '@material-ui/icons/Group';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { indigo } from '@material-ui/core/colors';
const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        //backgroundColor: '#004BFF',
        backgroundColor: indigo[300],
        alignItems: 'center', 
        justifyContent: 'space-evenly', 
        border: 0,
        borderRadius: 10,
        
    },
    
    icoon: {
        
        color: "#FFFFFF",
        fontSize: '2.5em'
        
    },
    tekst: {
        color: "#FFFFFF",
        fontSize: '1.5em',
        margin: '0 auto',
        textAlign: 'center'
        
        
    },
    
}));
export const PlayerListItem = (props: any) =>  {
    const classes = useStyles();


    return (
        
        <Grid item lg={3} xs={12} md={4} >
            <div className={classes.paper}>

            
            <GroupIcon className={classes.icoon}/>
            <span className={classes.tekst}>{props.player.name}</span></div>
        </Grid>
    );

};




