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
        backgroundColor: '#C4151C',
        cursor: 'pointer',
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
    const makePhoto = () => {
        console.log("todo: send request to create photo");
    }

    return (
        <Paper className={classes.paper} elevation={3} onClick = {makePhoto}>
            <AddAPhotoIcon className={classes.icoon}/>
            <span className={classes.tekst}>Take Photo</span>
        </Paper>
    );

};

export default TakePhoto;