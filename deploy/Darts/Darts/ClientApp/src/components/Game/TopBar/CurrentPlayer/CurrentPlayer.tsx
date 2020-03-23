import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import React from 'react';

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
        fontSize: '2.5em',
        marginRight: '1.5em'
        
    },
    tekst: {
        alignSelf: 'center',
        color: "#004BFF",
        fontSize: '1.5em',
        
    },
    
}));
function CurrentPlayer(props: any) {
    const classes = useStyles();


    return (
        
        <Paper className={classes.paper} elevation={3}>
            <EmojiPeopleIcon className={classes.icoon}/>
            <span className={classes.tekst}>Current Player: {props.name}</span>
        </Paper>
    );

};

export default CurrentPlayer;