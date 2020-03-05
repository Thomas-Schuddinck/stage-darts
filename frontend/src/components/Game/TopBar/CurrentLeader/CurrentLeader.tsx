import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import React from 'react';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'row',
        backgroundColor: '#FFD700'
        
    },
    
    icoon: {
        color: "#004BFF",
        fontSize: '2.5em',
        marginRight: '1.5em'
        
    },
    tekst: {
        alignSelf: 'center',
        color: "#004BFF",
        fontSize: '1.5em',
        
    },
    
}));
function CurrentLeader(props: any) {
    const classes = useStyles();


    return (
        
        <Paper className={classes.paper} elevation={3}>
            <EmojiEventsIcon className={classes.icoon}/>
            <span className={classes.tekst}>Current leader: {props.name}</span>
        </Paper>
    );

};

export default CurrentLeader;