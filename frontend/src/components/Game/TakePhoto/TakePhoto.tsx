import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import React from 'react';

const useStyles = makeStyles(theme => ({
    paper: {

        padding: theme.spacing(1),
        display: 'flex',
        overflow: 'auto',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#C4151C'
                
    },
    
    icoon: {
        color: "#FFFFFF",
        fontSize: '3em',
        
    },
    tekst: {
        color: "#FFFFFF",
        fontSize: '2em',
        
    },
    
}));
function TakePhoto() {
    const classes = useStyles();


    return (
        
        <Paper className={classes.paper} elevation={3}>
            <AddAPhotoIcon className={classes.icoon}/>
            <span className={classes.tekst}>Take Photo</span>
        </Paper>
    );

};

export default TakePhoto;