import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import React from 'react';
import Wrap from '../../../hoc/Wrap'


const useStyles = makeStyles(theme => ({
    roos: {
        color: "red",
        fontSize: '1.5em',
    },
    listItemText: {
        color: "red",
        fontSize: '2em'
    },
    mainDiv: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'center',
    }

}));

function LastDartThrow(props: any) {

    const classes = useStyles();


    return (
        <Wrap>
            <div className={classes.mainDiv}>
                
            <ListItemText classes={{ primary: classes.listItemText }} primary={props.score} />
            
            </div>
        </Wrap>
    );


};

export default LastDartThrow;


